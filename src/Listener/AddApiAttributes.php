<?php
namespace Avatar4eg\ShareSocial\Listener;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
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
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
        $events->listen(ConfigureApiController::class, [$this, 'includeStartPost']);
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

    /**
     * @param ConfigureApiController $event
     */
    public function includeStartPost(ConfigureApiController $event)
    {
        if ($event->isController(ShowDiscussionController::class)) {
            $event->addInclude('startPost');
        }
    }
}
