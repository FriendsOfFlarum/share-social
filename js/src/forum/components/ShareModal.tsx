import Form from 'flarum/common/components/Form';
import app from 'flarum/forum/app';
import { IFormModalAttrs } from 'flarum/common/components/FormModal';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import ItemList from 'flarum/common/utils/ItemList';
import Mithril from 'mithril';

import { getNetworkButtons } from '../util/networks';
import { ShareableDiscussion } from '../util/share';

export interface IShareModalAttrs extends IFormModalAttrs {
  networks: string[];
  discussion: ShareableDiscussion;
}

export default class ShareModal extends FormModal<IShareModalAttrs> {
  discussion!: ShareableDiscussion;

  oninit(vnode: Mithril.Vnode<IShareModalAttrs, this>) {
    super.oninit(vnode);

    this.discussion = this.attrs.discussion;
  }

  className(): string {
    return 'FofShareSocialModal Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('fof-share-social.forum.modal.title');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <Form className="Form--centered">
          <div className="Form-group">{this.shareItems().toArray()}</div>
        </Form>
      </div>
    );
  }

  shareItems(): ItemList<Mithril.Children> {
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
            <Icon name="fas fa-copy fa-check" />
          </Button>
        </div>
      );
    }

    return items;
  }

  copy() {
    const url = this.discussion.shareUrl();
    navigator.clipboard?.writeText(url).then(() => this.toggleCopyIcon());
  }

  toggleCopyIcon() {
    const copyButton = document.querySelector('.ShareUrl button i');
    if (!copyButton) return;
    copyButton.classList.toggle('fa-copy');
    setTimeout(() => {
      copyButton.classList.toggle('fa-copy');
    }, 3000);
  }
}
