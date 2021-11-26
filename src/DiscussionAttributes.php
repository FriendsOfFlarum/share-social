<?php

namespace FoF\ShareSocial;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

class DiscussionAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var UrlGenerator
     */
    protected $url;
    
    public function __construct(SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->settings = $settings;
        $this->url = $url;
    }

    public function __invoke(DiscussionSerializer $serializer, Discussion $discussion, array $attributes): array
    {
        $canonical = (bool) $this->settings->get('fof-share-social.canonical-urls');

        $attributes['shareUrl'] = $this->url->to('forum')->route('discussion', [
                'id' => $discussion->id.($canonical ? (trim($discussion->slug) ? '-'.$discussion->slug : '') : ''), ]);

        return $attributes;
    }
}
