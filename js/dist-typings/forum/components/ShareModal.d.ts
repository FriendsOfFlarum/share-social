import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import Mithril from 'mithril';
import { ShareableDiscussion } from '../util/share';
export interface IShareModalAttrs extends IInternalModalAttrs {
    networks: string[];
    discussion: ShareableDiscussion;
}
export default class ShareModal extends Modal<IShareModalAttrs> {
    discussion: ShareableDiscussion;
    oninit(vnode: Mithril.Vnode<IShareModalAttrs, this>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    shareItems(): ItemList<Mithril.Children>;
    copy(): void;
    toggleCopyIcon(): void;
}
