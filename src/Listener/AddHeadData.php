<?php namespace Avatar4eg\ShareSocial\Listener;

use Flarum\Event\ConfigureClientView;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Forum\UrlGenerator;
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

    public function __construct(SettingsRepositoryInterface $settings, UrlGenerator $urlGenerator) {
        $this->settings = $settings;
        $this->urlGenerator = $urlGenerator;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addMetaTags']);
    }
    
    public function addMetaTags(ConfigureClientView $event)
    {
        if($event->isForum()) {
            if ($this->settings->get('avatar4eg.share-social.open_graph') && (bool)$this->settings->get('avatar4eg.share-social.open_graph') === true) {
                $event->view->addHeadString('<meta property="og:type" content="website"/>');
                $event->view->addHeadString('<meta property="og:title" content="' . $this->settings->get('welcome_title') . '"/>');
                $event->view->addHeadString('<meta property="og:url" content="' . $this->urlGenerator->toBase() . '"/>');
                $event->view->addHeadString('<meta property="og:description" content="' . $this->settings->get('forum_description') . '"/>');
                $event->view->addHeadString('<meta property="og:site_name" content="' . $this->settings->get('forum_title') . '"/>');
            }
            if ($this->settings->get('avatar4eg.share-social.twitter_card') && (bool)$this->settings->get('avatar4eg.share-social.twitter_card') === true) {
                $event->view->addHeadString('<meta property="twitter:card" content="summary"/>');
                $event->view->addHeadString('<meta property="twitter:title" content="' . $this->settings->get('welcome_title') . '"/>');
                $event->view->addHeadString('<meta property="twitter:url" content="' . $this->urlGenerator->toBase() . '"/>');
                $event->view->addHeadString('<meta property="twitter:description" content="' . $this->settings->get('forum_description') . '"/>');
            }
        }
    }
}
