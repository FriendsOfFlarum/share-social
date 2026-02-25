import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';
import SplitDropdown from 'flarum/common/components/SplitDropdown';

import ShareModal from './components/ShareModal';
import { data, getNativeData, ShareableDiscussion } from './util/share';
import { getNetworkButtons } from './util/networks';

export { default as extend } from './extend';

app.initializers.add('fof/share-social', () => {
  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    const page = this as unknown as { discussion: ShareableDiscussion | null };
    const discussion = page.discussion;

    if (!discussion) return;

    const networks: string[] = app.forum.attribute('fof-share-social.networks');
    const def: string = app.forum.attribute('fof-share-social.default');

    const isNativeShare = def === 'native';
    const canNativeShare = isNativeShare && navigator.canShare?.(getNativeData(data(discussion)));

    if (def && (!isNativeShare || canNativeShare)) {
      const list = getNetworkButtons(discussion);

      // Use default share button text for native sharing
      if (isNativeShare) {
        (list.get('native') as any).children = app.translator.trans('fof-share-social.forum.discussion.share_button');
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
              discussion,
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
