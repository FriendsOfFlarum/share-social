import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';
import Model from 'flarum/common/Model';
import Discussion from 'flarum/common/models/Discussion';
import SplitDropdown from 'flarum/common/components/SplitDropdown';

import ShareModal from './components/ShareModal';
import { getNativeData } from './util/share';
import { getNetworkButtons } from './util/networks';

const getNetworks = () => {
  let cache = null;

  return (networks, def) => {
    if (cache) return cache;

    cache = [...networks];
    const index = cache.indexOf(def);

    if (index !== -1) {
      cache.splice(index, 1);
      cache.unshift(def);
    }

    return cache;
  };
};

app.initializers.add('fof/share-social', () => {
  Discussion.prototype.shareUrl = Model.attribute('shareUrl');

  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    const networks = app.forum.attribute('fof-share-social.networks');
    const def = app.forum.attribute('fof-share-social.default');

    const isNativeShare = def === 'native';
    const canNativeShare = isNativeShare && navigator.canShare?.(getNativeData(this.discussion));

    if (def && (!isNativeShare || canNativeShare)) {
      const list = getNetworkButtons(this.discussion);

      // Use default share button text for native sharing
      if (isNativeShare) {
        list.get('native').children = app.translator.trans('fof-share-social.forum.discussion.share_button');
      }

      if (list.isEmpty()) return;

      items.add(
        'share-social',
        <SplitDropdown
          icon="fas fa-share-alt"
          buttonClassName="Button--share"
          accessibleToggleLabel={app.translator.trans('fof-share-social.forum.discussion.share_dropdown_accessible_label')}
          lazyDraw={true}
        >
          {list.toArray()}
        </SplitDropdown>
      );
    } else {
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
