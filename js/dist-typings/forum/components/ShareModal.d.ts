import { IFormModalAttrs } from 'flarum/common/components/FormModal';
import FormModal from 'flarum/common/components/FormModal';
import ItemList from 'flarum/common/utils/ItemList';
import Mithril from 'mithril';
import { ShareableDiscussion } from '../util/share';
export interface IShareModalAttrs extends IFormModalAttrs {
    networks: string[];
    discussion: ShareableDiscussion;
}
export default class ShareModal extends FormModal<IShareModalAttrs> {
    discussion: ShareableDiscussion;
    oninit(vnode: Mithril.Vnode<IShareModalAttrs, this>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    shareItems(): ItemList<Mithril.Children>;
    copy(): void;
    toggleCopyIcon(): void;
}
