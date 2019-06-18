<?php

/*
 * This file is part of fof/share-social.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $settings = app('flarum.settings');

        if ($value = $settings->get($key = 'avatar4eg.share-social.list')) {
            $json = json_decode($value);

            if ($json != null) {
                foreach ($json as $network) {
                    $network = strtolower($network);

                    if ($network == 'google_plus') {
                        continue;
                    }

                    $settings->set("fof-share-social.networks.$network", true);
                }
            }

            $settings->delete($key);
        }
    },
    'down' => function () {
        // do nothing
    },
];
