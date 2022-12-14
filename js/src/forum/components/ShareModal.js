import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import { truncate, getPlainContent } from 'flarum/common/utils/string';

import pupa from 'pupa';

const navigatorData = ({ title, description, url }) => ({ title, text: description, url });

const share = {
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

  native: (data) => navigator.share(navigatorData(data)),
};

const shareIcons = {
  vkontakte: 'fab fa-vk',
  my_mail: 'fas fa-at',
  qq: 'fab fa-qq',
  qzone: 'fas fa-star',
  native: 'fas fa-share-square',
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
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group ShareUrl">
            <input className="FormControl" type="text" value={this.discussion.shareUrl()} />
            <Button
              className={'Button Button--primary'}
              aria-label={app.translator.trans('fof-share-social.forum.modal.copy_button')}
              onclick={this.copy.bind(this)}
            >
              {icon('fas fa-copy fa-check')}
            </Button>
          </div>
          <div className="Form-group">
            {this.networks
              .filter((name) => name !== 'native' || navigator.canShare?.(navigatorData(this.data())))
              .map((network) => (
                <Button
                  className={`Button Button--rounded Button--block Share--${network}`}
                  icon={`${shareIcons[network] || `fab fa-${network}`} fa-lg fa-fw`}
                  onclick={this.onclick.bind(this, network)}
                >
                  {app.translator.trans(`fof-share-social.lib.networks.${network}`)}
                </Button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  onclick(network) {
    const data = this.data();
    const action = share[network];

    if (typeof action === 'function') {
      return action(data);
    }

    const width = 1000;
    const height = 500;
    const top = $(window).height() / 2 - height / 2;
    const left = $(window).width() / 2 - width / 2;
    const windowParams = `width=${width}, height= ${height}, top=${top}, left=${left}, status=no, scrollbars=no, resizable=no`;

    for (const dataKey in data) {
      data[dataKey] = encodeURIComponent(data[dataKey]);
    }

    window.open(pupa(action, data), app.title, windowParams);
  }

  data() {
    const url = this.discussion.shareUrl();
    const title = app.title;
    const description = (this.discussion.firstPost() && truncate(getPlainContent(this.discussion.firstPost()?.contentHtml()), 150, 0)) || '';

    return { url, title, description };
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
