import app from 'flarum/admin/app';
import type { SelectSettingComponentOptions } from 'flarum/admin/components/AdminPage';

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
    .registerSetting({
      label: app.translator.trans('fof-share-social.admin.settings.plain-copy'),
      setting: 'fof-share-social.plain-copy',
      type: 'boolean',
    })
    .registerSetting({
      label: app.translator.trans('fof-share-social.admin.settings.default-option'),
      help: app.translator.trans('fof-share-social.admin.settings.default-option-help'),
      setting: 'fof-share-social.default-option',
      type: 'select',
      options: networks.reduce(
        (o, network) => {
          o[network] = app.translator.trans(`fof-share-social.lib.networks.${network}`);
          return o;
        },
        { '': '' } as SelectSettingComponentOptions['options']
      ),
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
