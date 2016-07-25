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

    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addMetaTags']);
        $events->listen(PrepareApiData::class, [$this, 'addDiscussionMetaTags']);
    }
    
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
                $dataTitle = $this->settings->get('welcome_title');
                $dataUrl = $this->urlGenerator->toBase();
                $dataDescription = $this->settings->get('forum_description');
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

    public function addDiscussionMetaTags(PrepareApiData $event)
    {
        if ($this->clientView && $event->isController(ShowDiscussionController::class)) {
            $dataTitle = $dataUrl = $dataDescription = '';
            if ($this->openGraph || $this->twitterCard) {
                $dataTitle = $event->data->title;
                $dataUrl = $this->urlGenerator->toRoute('discussion', ['id' => $event->data->id]);
            }
            if ($event->data->startPost) {
                $dataDescription = strip_tags($event->data->startPost->content);
                $dataDescription = strlen($dataDescription) > 150 ? substr($dataDescription, 0, 150) . '...' : $dataDescription;
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
}
