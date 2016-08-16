<?php
namespace Avatar4eg\ShareSocial\Listener;

use Flarum\Api\Controller\ShowDiscussionController;
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
        $events->listen(ConfigureClientView::class, [$this, 'addMetaTags']);
        $events->listen(PrepareApiData::class, [$this, 'addDiscussionMetaTags']);
    }

    /**
     * @param ConfigureClientView $event
     */
    public function addMetaTags(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $this->clientView = $event->view;

            if ($this->settings->get('avatar4eg.share-social.open_graph') && (bool)$this->settings->get('avatar4eg.share-social.open_graph') === true) {
                $this->openGraph = true;
            }
            if ($this->settings->get('avatar4eg.share-social.twitter_card') && (bool)$this->settings->get('avatar4eg.share-social.twitter_card') === true) {
                $this->twitterCard = true;
            }

            $dataTitle = $dataUrl = $dataDescription = '';
            if ($this->openGraph || $this->twitterCard) {
                $dataTitle = htmlspecialchars($this->settings->get('welcome_title'), ENT_QUOTES|ENT_HTML5|ENT_DISALLOWED|ENT_SUBSTITUTE, 'UTF-8');
                $dataUrl = $this->urlGenerator->toBase();
                $dataDescription = $this->plainText($this->settings->get('forum_description'), 150);
            }

            if ($this->openGraph) {
                $event->view->addHeadString('<meta property="og:type" content="website"/>', 'og_type');
                $event->view->addHeadString('<meta property="og:title" content="' . $dataTitle . '"/>', 'og_title');
                $event->view->addHeadString('<meta property="og:url" content="' . $dataUrl . '"/>', 'og_url');
                $event->view->addHeadString('<meta property="og:description" content="' . $dataDescription . '"/>', 'og_description');
                $event->view->addHeadString('<meta property="og:site_name" content="' . $this->settings->get('forum_title') . '"/>', 'og_site_name');
            }
            if ($this->twitterCard) {
                $event->view->addHeadString('<meta property="twitter:card" content="summary"/>', 'twitter_card');
                $event->view->addHeadString('<meta property="twitter:title" content="' . $dataTitle . '"/>', 'twitter_title');
                $event->view->addHeadString('<meta property="twitter:url" content="' . $dataUrl . '"/>', 'twitter_url');
                $event->view->addHeadString('<meta property="twitter:description" content="' . $dataDescription . '"/>', 'twitter_description');
            }
        }
    }

    /**
     * @param PrepareApiData $event
     */
    public function addDiscussionMetaTags(PrepareApiData $event)
    {
        if ($this->clientView && $event->isController(ShowDiscussionController::class)) {
            $dataTitle = $dataUrl = $dataDescription = '';
            if ($this->openGraph || $this->twitterCard) {
                $dataTitle = htmlspecialchars($event->data->title, ENT_QUOTES|ENT_HTML5|ENT_DISALLOWED|ENT_SUBSTITUTE, 'UTF-8');
                $dataUrl = $this->urlGenerator->toRoute('discussion', ['id' => $event->data->id]);
            }
            if ($event->data->startPost) {
                $dataDescription = $this->plainText($event->data->startPost->content, 150);
            }

            //$this->clientView->addHeadString('<meta name="description" content="' . $dataDescription . '"/>', 'description');
            if ($this->openGraph) {
                $this->clientView->addHeadString('<meta property="og:title" content="' . $dataTitle . '"/>', 'og_title');
                $this->clientView->addHeadString('<meta property="og:url" content="' . $dataUrl . '"/>', 'og_url');
                $this->clientView->addHeadString('<meta property="og:description" content="' . $dataDescription . '"/>', 'og_description');
            }
            if ($this->twitterCard) {
                $this->clientView->addHeadString('<meta property="twitter:title" content="' . $dataTitle . '"/>', 'twitter_title');
                $this->clientView->addHeadString('<meta property="twitter:url" content="' . $dataUrl . '"/>', 'twitter_url');
                $this->clientView->addHeadString('<meta property="twitter:description" content="' . $dataDescription . '"/>', 'twitter_description');
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
        $text = htmlspecialchars($text, ENT_QUOTES|ENT_HTML5|ENT_DISALLOWED|ENT_SUBSTITUTE, 'UTF-8');
        if ($length !== null) {
            $text = mb_strlen($text, 'UTF-8') > $length ? mb_substr($text, 0, $length, 'UTF-8') . '...' : $text;
        }

        return $text;
    }
}
