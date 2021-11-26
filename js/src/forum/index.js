import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';
import Model from 'flarum/common/Model';
import Discussion from 'flarum/common/models/Discussion';

import ShareModal from './components/ShareModal';

app.initializers.add('fof/share-social', () => {
  Discussion.prototype.shareUrl = Model.attribute('shareUrl');

  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    const networks = app.forum.attribute('fof-share-social.networks');

    if (networks.length) {
      items.add(
        'share-social',
        <Button
          class="Button Button-icon Button--share"
          icon="fas fa-share-alt"
          onclick={() =>
            app.modal.show(ShareModal, {
              networks,
              discussion: this.discussion,
            })
          }
        >
          {app.translator.trans('fof-share-social.forum.discussion.share_button')}
        </Button>,
        -1
      );
    }
  });
});
