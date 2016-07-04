import { extend } from 'flarum/extend';
import app from 'flarum/app';

import ShareSettingsModal from 'avatar4eg/share-social/components/ShareSettingsModal';

app.initializers.add('avatar4eg-share-social', app => {
    app.extensionSettings['avatar4eg-share-social'] = () => app.modal.show(new ShareSettingsModal());
});
