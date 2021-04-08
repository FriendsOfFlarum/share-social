<?php

namespace FoF\ShareSocial;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;

    const PREFIX = 'fof-share-social.networks.';

    const KEYS = ['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram', 'vkontakte', 'odnoklassniki', 'my_mail', 'qq', 'qzone'];

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $networks = [];

        foreach (self::KEYS as $key) {
            if ($this->settings->get(self::PREFIX . $key)) {
                $networks[] = $key;
            }
        }

        return [
            'fof-share-social.networks' => $networks,
        ];
    }
}
