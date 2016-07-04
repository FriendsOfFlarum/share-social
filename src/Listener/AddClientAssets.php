<?php 
namespace Avatar4eg\ShareSocial\Listener;

use DirectoryIterator;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Event\PrepareApiData;
use Flarum\Api\Serializer\ForumSerializer;

class AddClientAssets
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if($event->isForum()) {
            $event->addAssets([
                __DIR__ . '/../../js/forum/dist/extension.js',
                __DIR__ . '/../../less/forum/extension.less',
            ]);
            $event->addBootstrapper('avatar4eg/share-social/main');
        }

        if($event->isAdmin()) {
            $event->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js',
            ]);
            $event->addBootstrapper('avatar4eg/share-social/main');
        }
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $list = $this->settings->get('avatar4eg.share-social.list') ? json_decode($this->settings->get('avatar4eg.share-social.list')) : [];
            $list_checked = [];
            foreach ($list as $item) {
                if ($this->settings->get('avatar4eg.share-social.' . $item) && (bool)$this->settings->get('avatar4eg.share-social.' . $item) === true) {
                    $list_checked[] = $item;
                }
            }
            $event->attributes['shareSocialButtons'] = json_encode($list_checked);
            $event->attributes['shareSocialOpenGraph'] = $this->settings->get('avatar4eg.share-social.open_graph');
            $event->attributes['shareSocialTwitterCard'] = $this->settings->get('avatar4eg.share-social.twitter_card');
        }
    }

    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__ .'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
    }
}
