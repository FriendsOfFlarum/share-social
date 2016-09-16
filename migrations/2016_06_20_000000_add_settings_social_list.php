<?php
namespace Avatar4eg\ShareSocial\Migration;

use Illuminate\Database\ConnectionInterface;

return [
    'up' => function (ConnectionInterface $db) {
        $db->table('settings')->insert([
            'key' => 'avatar4eg.share-social.list',
            'value' => '["facebook","vkontakte","twitter","google_plus","odnoklassniki","my_mail"]'
        ]);
    },

    'down' => function (ConnectionInterface $db) {
        $db->table('settings')->where('key', 'avatar4eg.share-social.list')->delete();
    }
];