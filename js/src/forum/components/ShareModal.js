import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { truncate, getPlainContent } from 'flarum/common/utils/string';

import pupa from 'pupa';

const shareUrls = {
  facebook: '//facebook.com/sharer/sharer.php?u={url}',
  twitter: '//twitter.com/share?url={url}&text={title}',
  linkedin: '//linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}',
  reddit: '//www.reddit.com/submit?url={url}&title={title}',
  whatsapp: '//wa.me/?text={title}%20{url}',
  telegram: '//telegram.me/share/url?url={url}&text={title}',

  vkontakte: '//vk.com/share.php?url={url}&title={title}&description={description}',
  odnoklassniki: '//connect.ok.ru/offer?url={url}',
  my_mail: '//connect.mail.ru/share?url={url}&title={title}&description={description}',
  qq: '//connect.qq.com/widget/shareqq/iframe_index.html?url={url}&title={title}',
  qzone: '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&summary={description}&title={title}',
};

const shareIcons = {
  vkontakte: 'fab fa-vk',
  my_mail: 'fas fa-at',
  qq: 'fab fa-qq',
  qzone: 'fas fa-star',
};

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
    const url = encodeURIComponent(this.discussion.shareUrl());
    const title = encodeURIComponent(app.title);
    const description = this.discussion.firstPost()
      ? encodeURIComponent(truncate(getPlainContent(this.discussion.firstPost().contentHtml()), 150, 0))
      : '';
    const data = { url, title, description };

    const width = 1000;
    const height = 500;
    const top = $(window).height() / 2 - height / 2;
    const left = $(window).width() / 2 - width / 2;
    const windowParams = `width=${width}, height= ${height}, top=${top}, left=${left}, status=no, scrollbars=no, resizable=no`;

    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            {this.networks.map((network) =>
              Button.component(
                {
                  className: `Button Button--rounded Button--block Share--${network}`,
                  icon: `${shareIcons[network] || `fab fa-${network}`} fa-lg fa-fw`,
                  onclick: () => window.open(pupa(shareUrls[network], data), app.title, windowParams),
                },
                app.translator.trans(`fof-share-social.lib.networks.${network}`)
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
