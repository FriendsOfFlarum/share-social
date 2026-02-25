<?php

/*
 * This file is part of fof/share-social.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ShareSocial;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

class DiscussionAttributes
{
    public function __construct(protected SettingsRepositoryInterface $settings, protected UrlGenerator $url)
    {
    }

    public function __invoke(DiscussionSerializer $serializer, Discussion $discussion, array $attributes): array
    {
        $canonical = (bool) $this->settings->get('fof-share-social.canonical-urls');

        $attributes['shareUrl'] = $this->url->to('forum')->route('discussion', [
            'id' => $discussion->id.($canonical ? (trim($discussion->slug) ? '-'.$discussion->slug : '') : ''), ]);

        return $attributes;
    }
}
