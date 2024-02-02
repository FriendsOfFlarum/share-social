import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';

import { getNetworkButtons } from '../util/networks';

export default class ShareModal extends Modal {
  oninit(vdom) {
    super.oninit(vdom);

    this.networks = this.attrs.networks;
    this.discussion = this.attrs.discussion;
  }

  className() {
    return 'FofShareSocialModal Modal--small';
  }

  title() {
    return app.translator.trans('fof-share-social.forum.modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">{this.shareItems().toArray()}</div>
        </div>
      </div>
    );
  }

  shareItems() {
    const items = getNetworkButtons(this.discussion, true);
    const plainCopy = app.forum.attribute('fof-share-social.plain-copy');

    if (plainCopy) {
      items.add(
        'plain-copy',
        <div className="ShareUrl">
          <input className="FormControl" type="text" value={this.discussion.shareUrl()} />
          <Button
            className={'Button Button--primary'}
            aria-label={app.translator.trans('fof-share-social.forum.modal.copy_button')}
            onclick={this.copy.bind(this)}
          >
            {icon('fas fa-copy fa-check')}
          </Button>
        </div>
      );
    }

    return items;
  }

  onclick(network) {
    return share(network);
  }

  copy() {
    const copyText = document.querySelector('.ShareUrl input');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    this.toggleCopyIcon();
  }

  toggleCopyIcon() {
    const copyButton = document.querySelector('.ShareUrl button i');
    copyButton.classList.toggle('fa-copy');
    setTimeout(() => {
      copyButton.classList.toggle('fa-copy');
    }, 3000);
  }
}
