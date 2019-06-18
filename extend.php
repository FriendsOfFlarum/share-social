<?php

/*
 * This file is part of fof/share-social.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ShareSocial;

use Flarum\Extend as Native;
use FoF\Extend\Extend;

return [
    (new Native\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Native\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Native\Locales(__DIR__.'/resources/locale'),
    (new Extend\ExtensionSettings())
        ->setPrefix('fof-share-social.networks.')
        ->addKeys(['facebook', 'twitter', 'linkedin', 'reddit', 'vkontakte', 'odnoklassniki', 'my_mail']),
];
