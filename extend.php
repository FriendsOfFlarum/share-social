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
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('shareUrl', function (DiscussionSerializer $serializer, Discussion $discussion) {
            /** @var UrlGenerator */
            $url = resolve(UrlGenerator::class);
            $canonical = (bool) resolve(SettingsRepositoryInterface::class)->get('fof-share-social.canonical-urls');

            return $url->to('forum')->route('discussion', [
                'id' => $discussion->id.($canonical ? (trim($discussion->slug) ? '-'.$discussion->slug : '') : ''), ]);
        }),
];
