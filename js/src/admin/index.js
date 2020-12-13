import app from 'flarum/app';

const networks = [
    ['facebook', 'twitter', 'linkedin', 'reddit'],
    ['whatsapp', 'telegram'],
    ['vkontakte', 'odnoklassniki', 'my_mail'],
    ['qq', 'qzone'],
];

app.initializers.add('fof/share-social', () => {
    let set = app.extensionData.for('fof-share-social');

    networks.map(networks =>
        networks.map(network =>
            set.registerSetting({
                label: app.translator.trans(`fof-share-social.lib.networks.${network}`),
                setting: `fof-share-social.networks.${network}`,
                type: 'boolean',
            })
        )
    );
});
