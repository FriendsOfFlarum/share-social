import app from 'flarum/forum/app';
import { getPlainContent, truncate } from 'flarum/common/utils/string';
import pupa from 'pupa';

export const networks = {
  facebook: '//facebook.com/sharer/sharer.php?u={url}',
  twitter: '//twitter.com/share?url={url}&text={title}',
  linkedin: '//linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}',
  reddit: '//www.reddit.com/submit?url={url}&title={title}',
  whatsapp: '//api.whatsapp.com/send/?phone&text={title}%20{url}',
  telegram: '//telegram.me/share/url?url={url}&text={title}',

  vkontakte: '//vk.com/share.php?url={url}&title={title}&description={description}',
  odnoklassniki: '//connect.ok.ru/offer?url={url}',
  my_mail: '//connect.mail.ru/share?url={url}&title={title}&description={description}',
  qq: '//connect.qq.com/widget/shareqq/iframe_index.html?url={url}&title={title}',
  qzone: '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&summary={description}&title={title}',

  native: (data) => navigator.share(getNativeData(data)),
};
export const networkIcons = {
  vkontakte: 'fab fa-vk',
  my_mail: 'fas fa-at',
  qq: 'fab fa-qq',
  qzone: 'fas fa-star',
  native: 'fas fa-share-square',
};

export const data = (discussion) => {
  const url = discussion.shareUrl();
  const title = app.title;
  const description = (discussion.firstPost() && truncate(getPlainContent(discussion.firstPost()?.contentHtml()), 150, 0)) || '';

  return { url, title, description };
};

export const getNativeData = ({ title, description, url }) => ({ title, text: description, url });

export const canNativeShare = (discussion) => {
  return navigator.canShare?.(getNativeData(discussion));
};
