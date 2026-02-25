import ItemList from 'flarum/common/utils/ItemList';
import { ShareableDiscussion } from './share';
import Mithril from 'mithril';
export declare const getNetworkButton: ({ network, discussion, isRounded, }: {
    network: string;
    discussion: ShareableDiscussion;
    isRounded?: boolean | undefined;
}) => Mithril.Children;
export declare const onNetworkButtonClick: (network: string, discussion: ShareableDiscussion) => void;
export declare const getNetworkButtons: (discussion: ShareableDiscussion, isRounded?: boolean) => ItemList<Mithril.Children>;
