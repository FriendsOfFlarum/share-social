import Discussion from 'flarum/common/models/Discussion';
export type ShareData = {
    url: string;
    title: string;
    description: string;
};
type NetworkAction = string | ((data: ShareData) => void);
export declare const networks: Record<string, NetworkAction>;
export declare const networkIcons: Record<string, string>;
export type ShareableDiscussion = Discussion & {
    shareUrl: () => string;
};
export declare const data: (discussion: ShareableDiscussion) => ShareData;
export declare const getNativeData: ({ title, description, url }: ShareData) => {
    title: string;
    text: string;
    url: string;
};
export declare const canNativeShare: (discussion: ShareableDiscussion) => boolean;
export {};
