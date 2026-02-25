import app from 'flarum/forum/app';
import { getPlainContent, truncate } from 'flarum/common/utils/string';
import Discussion from 'flarum/common/models/Discussion';

export type ShareData = {
  url: string;
  title: string;
  description: string;
};

type NetworkAction = string | ((data: ShareData) => void);

export const networks: Record<string, NetworkAction> = {
  facebook: '//facebook.com/sharer/sharer.php?u={url}',
  twitter: '//twitter.com/intent/tweet?url={url}&text={title}',
  linkedin: '//linkedin.com/sharing/share-offsite/?url={url}',
  reddit: '//www.reddit.com/submit?url={url}&title={title}',
  whatsapp: '//api.whatsapp.com/send/?phone&text={title}%20{url}',
  telegram: '//telegram.me/share/url?url={url}&text={title}',

  vkontakte: '//vk.com/share.php?url={url}&title={title}&description={description}',
  odnoklassniki: '//connect.ok.ru/offer?url={url}',
  my_mail: '//connect.mail.ru/share?url={url}&title={title}&description={description}',
  qq: '//connect.qq.com/widget/shareqq/iframe_index.html?url={url}&title={title}',
  qzone: '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&summary={description}&title={title}',

  native: (shareData) => navigator.share(getNativeData(shareData)),
};

export const networkIcons: Record<string, string> = {
  vkontakte: 'fab fa-vk',
  my_mail: 'fas fa-at',
  qq: 'fab fa-qq',
  qzone: 'fas fa-star',
  native: 'fas fa-share-square',
};

const networkIconsFA6: Record<string, string> = {
  twitter: 'fab fa-x-twitter',
};

export const getNetworkIcon = (network: string): string => {
  const fa6 = app.forum.attribute('fof-share-social.fa6Enabled') as boolean | undefined;
  const icons = fa6 ? { ...networkIcons, ...networkIconsFA6 } : networkIcons;
  return icons[network] || `fab fa-${network}`;
};

export type ShareableDiscussion = Discussion & { shareUrl: () => string };

export const data = (discussion: ShareableDiscussion): ShareData => {
  const url = discussion.shareUrl();
  const title = discussion.title();
  const firstPost = discussion.firstPost();
  const description = (firstPost && truncate(getPlainContent(firstPost.contentHtml() as string), 150, 0)) || '';

  return { url, title, description };
};

export const getNativeData = ({ title, description, url }: ShareData): { title: string; text: string; url: string } => ({
  title,
  text: description,
  url,
});

export const canNativeShare = (discussion: ShareableDiscussion): boolean => {
  return !!navigator.canShare?.(getNativeData(data(discussion)));
};
