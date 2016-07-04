import app from 'flarum/app';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';
import { extend } from 'flarum/extend';

import ShareModal from 'avatar4eg/share-social/components/ShareModal';
import addMetaTags from 'avatar4eg/share-social/addMetaTags';

app.initializers.add('avatar4eg-share-social', function() {
    addMetaTags();

    extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
        items.add('share-social',
            Button.component({
                className: 'Button Button-icon Button--share',
                icon: 'share-alt',
                children: app.translator.trans('avatar4eg-share-social.forum.share_button'),
                onclick: function () {
                    var post = null;
                    if(app.current.discussion.posts().length !== 0) {
                        post = app.current.discussion.posts()[0];
                    }
                    app.modal.show(new ShareModal({post}))
                }
            }), -1);
    });
});
