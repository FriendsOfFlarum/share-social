import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import type { SelectFieldComponentOptions } from 'flarum/common/components/FormGroup';

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

const networkSetting = (network: string) => () => ({
  label: app.translator.trans(`fof-share-social.lib.networks.${network}`),
  setting: `fof-share-social.networks.${network}`,
  type: 'boolean',
});

export default [
  new Extend.Admin() //
    .setting(() => ({
      label: app.translator.trans('fof-share-social.admin.settings.canonical-urls'),
      setting: 'fof-share-social.canonical-urls',
      type: 'boolean',
    }))
    .setting(() => ({
      label: app.translator.trans('fof-share-social.admin.settings.plain-copy'),
      setting: 'fof-share-social.plain-copy',
      type: 'boolean',
    }))
    .setting(() => ({
      label: app.translator.trans('fof-share-social.admin.settings.default-option'),
      help: app.translator.trans('fof-share-social.admin.settings.default-option-help'),
      setting: 'fof-share-social.default-option',
      type: 'select',
      options: networks.reduce(
        (o, network) => {
          o[network] = app.translator.trans(`fof-share-social.lib.networks.${network}`);
          return o;
        },
        { '': '' } as SelectFieldComponentOptions['options']
      ),
    }))
    .customSetting(() => m('hr'))
    .setting(networkSetting('facebook'))
    .setting(networkSetting('twitter'))
    .setting(networkSetting('linkedin'))
    .setting(networkSetting('reddit'))
    .setting(networkSetting('whatsapp'))
    .setting(networkSetting('telegram'))
    .setting(networkSetting('vkontakte'))
    .setting(networkSetting('odnoklassniki'))
    .setting(networkSetting('my_mail'))
    .setting(networkSetting('qq'))
    .setting(networkSetting('qzone'))
    .setting(networkSetting('native')),
];
