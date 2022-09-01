import app from 'flarum/admin/app';

const networks = [
  'facebook',
  'twitter',
  'linkedin',
  'reddit',
  'whatsapp',
  'telegram',
  'vkontakte',
  'odnoklassniki',
  'my_mail',
  'qq',
  'qzone',
  'native',
];

app.initializers.add('fof/share-social', () => {
  const set = app.extensionData.for('fof-share-social');

  set
    .registerSetting({
      label: app.translator.trans('fof-share-social.admin.settings.canonical-urls'),
      setting: 'fof-share-social.canonical-urls',
      type: 'boolean',
    })
    .registerSetting(function () {
      return <hr />;
    });

  networks.forEach((network) =>
    set.registerSetting({
      label: app.translator.trans(`fof-share-social.lib.networks.${network}`),
      setting: `fof-share-social.networks.${network}`,
      type: 'boolean',
    })
  );
});
