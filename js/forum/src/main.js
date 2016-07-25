import app from 'flarum/app';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';
import { extend } from 'flarum/extend';

import ShareModal from 'avatar4eg/share-social/components/ShareModal';
import addMetaTags from 'avatar4eg/share-social/addMetaTags';

app.initializers.add('avatar4eg-share-social', function() {
    addMetaTags();

    extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
        var socialButtons = app.forum.attribute('shareSocialButtons') ? JSON.parse(app.forum.attribute('shareSocialButtons')) : [];
        if (socialButtons.length > 0) {
            items.add('share-social',
                Button.component({
                    className: 'Button Button-icon Button--share',
                    icon: 'share-alt',
                    children: app.translator.trans('avatar4eg-share-social.forum.share_button'),
                    onclick: function () {
                        app.modal.show(new ShareModal({
                            'socialButtons': socialButtons,
                            'discussion': app.current.discussion
                        }))
                    }
                }), -1);
        }
    });
});
