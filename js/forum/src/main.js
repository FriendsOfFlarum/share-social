import { extend } from 'flarum/extend';
import app from 'flarum/app';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Button from 'flarum/components/Button';
import ShareSocialModal from 'vingle/share/social/components/ShareSocialModal';
import {truncate} from 'flarum/utils/string'
import {getPlainContent} from 'flarum/utils/string'

app.initializers.add('vingle-share-social', function() {
    extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
        if(app.current.discussion.startPost()){
            var post = app.current.discussion.startPost();
            var description = truncate(getPlainContent(post.contentHtml()),150,0);
             $('meta[name=description]').attr('content', description.toLowerCase());
        }
        items.add('share-social',
            Button.component({
                className: 'Button Button-icon Button--share',
                icon: 'share-alt',
                children: app.forum.attribute('vingle.share.social') ? app.forum.attribute('vingle.share.social') : 'Share',
                onclick: () => app.modal.show(new ShareSocialModal())
            }), 5);
    });
});
