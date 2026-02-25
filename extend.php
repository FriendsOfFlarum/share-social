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

use Flarum\Api\Resource;
use Flarum\Api\Schema;
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

    (new Extend\Settings())
        ->default('fof-share-social.plain-copy', true)
        ->serializeToForum('fof-share-social.plain-copy', 'fof-share-social.plain-copy')
        ->serializeToForum('fof-share-social.default', 'fof-share-social.default-option'),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(fn () => [
            Schema\Arr::make('fof-share-social.networks')
                ->get(function () {
                    /** @var SettingsRepositoryInterface $settings */
                    $settings = resolve(SettingsRepositoryInterface::class);
                    $keys = ['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram', 'vkontakte', 'odnoklassniki', 'my_mail', 'qq', 'qzone', 'native'];
                    $networks = [];

                    foreach ($keys as $key) {
                        if ($settings->get('fof-share-social.networks.'.$key)) {
                            $networks[] = $key;
                        }
                    }

                    return $networks;
                }),
        ]),

    (new Extend\ApiResource(Resource\DiscussionResource::class))
        ->fields(fn () => [
            Schema\Str::make('shareUrl')
                ->get(function (Discussion $discussion) {
                    /** @var SettingsRepositoryInterface $settings */
                    $settings = resolve(SettingsRepositoryInterface::class);
                    /** @var UrlGenerator $url */
                    $url = resolve(UrlGenerator::class);

                    $canonical = (bool) $settings->get('fof-share-social.canonical-urls');

                    return $url->to('forum')->route('discussion', [
                        'id' => $discussion->id.($canonical ? (trim($discussion->slug) ? '-'.$discussion->slug : '') : ''),
                    ]);
                }),
        ]),
];
