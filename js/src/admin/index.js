import { settings } from '@fof-components';
const {
  SettingsModal,
  items: { BooleanItem },
} = settings;

const networks = [['facebook', 'twitter', 'linkedin', 'reddit'], ['vkontakte', 'odnoklassniki', 'my_mail'], ['qq', 'qzone']];

app.initializers.add('fof/share-social', () => {
    app.extensionSettings['fof-share-social'] = () =>
        app.modal.show(
            new SettingsModal({
                title: app.translator.trans('fof-share-social.admin.settings.title'),
                className: 'FofShareSocialSettingsModal',
                size: 'small',
                items: [
                    ...networks.map(networks =>
                        networks.map(network => (
                            <BooleanItem key={`fof-share-social.networks.${network}`}>
                                {app.translator.trans(`fof-share-social.lib.networks.${network}`)}
                            </BooleanItem>
                        ))
                    ),
                ],
            })
        );
});
