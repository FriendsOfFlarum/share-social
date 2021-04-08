import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';

import ShareModal from './components/ShareModal';

app.initializers.add('fof/share-social', () => {
    extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
        const networks = app.forum.attribute('fof-share-social.networks');

        if (networks.length) {
            items.add(
                'share-social',
                Button.component(
                    {
                        className: 'Button Button-icon Button--share',
                        icon: 'fas fa-share-alt',
                        onclick: () =>
                            app.modal.show(ShareModal, {
                                networks,
                                discussion: this.discussion,
                            }),
                    },
                    app.translator.trans('fof-share-social.forum.discussion.share_button')
                ),
                -1
            );
        }
    });
});
