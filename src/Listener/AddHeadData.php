<?php
namespace Avatar4eg\ShareSocial\Listener;

use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\ShowUserController;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\PrepareApiData;
use Flarum\Forum\UrlGenerator;
use Flarum\Http\Controller\ClientView;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class AddHeadData
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var UrlGenerator
     */
    protected $urlGenerator;

    /**
     * @var ClientView
     */
    protected $clientView;

    /**
     * @var bool
     */
    protected $openGraph = false;

    /**
     * @var bool
     */
    protected $twitterCard = false;

    public function __construct(SettingsRepositoryInterface $settings, UrlGenerator $urlGenerator) {
        $this->settings = $settings;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'getClientView']);
        $events->listen(PrepareApiData::class, [$this, 'addMetaTags']);
    }

    /**
     * @param ConfigureClientView $event
     */
    public function getClientView(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $this->clientView = $event->view;

            if ($this->settings->get('avatar4eg.share-social.open_graph') && (bool)$this->settings->get('avatar4eg.share-social.open_graph') === true) {
                $this->openGraph = true;
            }
            if ($this->settings->get('avatar4eg.share-social.twitter_card') && (bool)$this->settings->get('avatar4eg.share-social.twitter_card') === true) {
                $this->twitterCard = true;
            }

            if ($this->openGraph || $this->twitterCard) {
                $data = [];
                $data['url'] = $this->urlGenerator->toBase();
                $data['title'] = $this->plainText($this->settings->get('welcome_title'), 80);
                $data['description'] = $this->plainText($this->settings->get('forum_description'), 150);

                $this->addOpenGraph([
                    'type' => 'website',
                    'site_name' => $this->settings->get('forum_title')
                ]);
                $this->addOpenGraph($data);
                $this->addTwitterCard([
                    'card' => 'summary'
                ]);
                $this->addTwitterCard($data);
            }
        }
    }

    /**
     * @param PrepareApiData $event
     */
    public function addMetaTags(PrepareApiData $event)
    {
        if ($this->clientView && ($this->openGraph || $this->twitterCard)) {
            $data = [];

            switch (true) {
                case $event->isController(ShowDiscussionController::class):
                    $data['url'] = $this->urlGenerator->toRoute('discussion', ['id' => $event->data->id . '-' . $event->data->slug]);
                    $data['title'] = $this->plainText($event->data->title, 80);
                    $post_id = $event->request->getQueryParams()['page']['near'];
                    if ($post_id === null) {
                        $data['description'] = $event->data->startPost ? $this->plainText($event->data->startPost->content, 150) : '';
                    } else {
                        $post = array_key_exists((int)$post_id - 1, $event->data->posts) ? $event->data->posts[(int)$post_id - 1] : null;
                        $data['url'] .= '/' . $post_id;
                        if ($post) {
                            $data['description'] = $this->plainText($post->content, 150);
                        } else {
                            $data['description'] = $event->data->startPost ? $this->plainText($event->data->startPost->content, 150) : '';
                        }
                    }
                    break;
//                case $event->isController(ListDiscussionsController::class):
//                    $data['url'] = $this->urlGenerator->toRoute('user', ['username' => $event->data->username]);
//                    $data['title'] = $this->plainText($event->data->username, 80);
//                    $data['description'] = $event->data->bio ? $this->plainText($event->data->bio, 150) : '';
//                    break;
//                case $event->isController(ShowUserController::class):
//                    $data['url'] = $this->urlGenerator->toRoute('user', ['username' => $event->data->username]);
//                    $data['title'] = $this->plainText($event->data->username, 80);
//                    $data['description'] = $event->data->bio ? $this->plainText($event->data->bio, 150) : '';
//                    break;
                default:
                    break;
            }

            $this->addOpenGraph($data);
            $this->addTwitterCard($data);
        }
    }

    /**
     * @param array $data
     */
    public function addOpenGraph(array $data = [])
    {
        if ($this->openGraph) {
            foreach ($data as $key => $value) {
                $this->clientView->addHeadString('<meta property="og:' . $key . '" content="' . $value . '"/>', 'og_' . $key . '');
            }
        }
    }

    /**
     * @param array $data
     */
    public function addTwitterCard(array $data = [])
    {
        if ($this->twitterCard) {
            foreach ($data as $key => $value) {
                $this->clientView->addHeadString('<meta property="twitter:' . $key . '" content="' . $value . '"/>', 'twitter_' . $key . '');
            }
        }
    }

    /**
     * @param string $text
     * @param int|null $length
     * @return string
     */
    protected function plainText($text, $length = null)
    {
        $text = strip_tags($text);
        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);
        $text = htmlspecialchars($text, ENT_QUOTES|ENT_HTML5|ENT_DISALLOWED|ENT_SUBSTITUTE, 'UTF-8');
        if ($length !== null) {
            $text = mb_strlen($text, 'UTF-8') > $length ? mb_substr($text, 0, $length, 'UTF-8') . '...' : $text;
        }

        return $text;
    }
}
