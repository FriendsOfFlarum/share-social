<?php
namespace Avatar4eg\ShareSocial\Migration;

use Illuminate\Database\ConnectionInterface;

return [
    'up' => function (ConnectionInterface $db) {
        $db->table('settings')->where('key', 'avatar4eg.share-social.list')->update([
            'value' => '["facebook","vkontakte","twitter","google_plus","odnoklassniki","my_mail","linkedin"]'
        ]);
    },

    'down' => function (ConnectionInterface $db) {
        $db->table('settings')->where('key', 'avatar4eg.share-social.list')->update([
            'value' => '["facebook","vkontakte","twitter","google_plus","odnoklassniki","my_mail"]'
        ]);
    }
];