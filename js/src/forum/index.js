import { extend } from 'flarum/extend';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';

import ShareModal from './components/ShareModal';

app.initializers.add('fof/share-social', () => {
    extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
        const prefix = 'fof-share-social.networks.';
        const networks = Object.keys(app.data)
            .filter(k => k.startsWith('fof-share-social.networks.') && Number(app.data[k]))
            .map(k => k.replace(prefix, ''));

        if (networks.length) {
            items.add(
                'share-social',
                Button.component({
                    className: 'Button Button-icon Button--share',
                    icon: 'fas fa-share-alt',
                    children: app.translator.trans('fof-share-social.forum.discussion.share_button'),
                    onclick: () =>
                        app.modal.show(
                            new ShareModal({
                                networks,
                                discussion: this.discussion,
                            })
                        ),
                }),
                -1
            );
        }
    });
});
