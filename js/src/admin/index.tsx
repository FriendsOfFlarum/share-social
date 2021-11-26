import app from 'flarum/admin/app';

const networks = [
  ['facebook', 'twitter', 'linkedin', 'reddit'],
  ['whatsapp', 'telegram'],
  ['vkontakte', 'odnoklassniki', 'my_mail'],
  ['qq', 'qzone'],
];

app.initializers.add('fof/share-social', () => {
  let set = app.extensionData.for('fof-share-social');

  set.registerSetting({
    label: app.translator.trans('fof-share-social.admin.settings.canonical-urls'),
    setting: 'fof-share-social.canonical-urls',
    type: 'boolean',
  });

  set.registerSetting(function () {
    return <hr />;
  });

  networks.forEach((networks) =>
    networks.forEach((network) =>
      set.registerSetting({
        label: app.translator.trans(`fof-share-social.lib.networks.${network}`),
        setting: `fof-share-social.networks.${network}`,
        type: 'boolean',
      })
    )
  );
});
