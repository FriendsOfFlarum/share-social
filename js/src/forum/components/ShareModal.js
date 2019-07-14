import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { truncate } from 'flarum/utils/string';
import { getPlainContent } from 'flarum/utils/string';

import pupa from 'pupa';

const shareUrls = {
    facebook: '//facebook.com/sharer/sharer.php?u={url}',
    twitter: '//twitter.com/share?url={url}&text={title}',
    linkedin: '//linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}',
    reddit: '//www.reddit.com/submit?url={url}&title={title}',

    vkontakte: '//vk.com/share.php?url={url}&title={title}&description={description}',
    odnoklassniki: '//connect.ok.ru/offer?url={url}',
    my_mail: '//connect.mail.ru/share?url={url}&title={title}&description={description}',
    qq: '//connect.qq.com/widget/shareqq/iframe_index.html?url={url}&title={title}'
};

const shareIcons = {
    vkontakte: 'fab fa-vk',
    my_mail: 'fas fa-at',
    qq: 'fab fa-qq'
};

export default class ShareModal extends Modal {
    init() {
        super.init();

        this.networks = this.props.networks;
        this.discussion = this.props.discussion;
    }

    className() {
        return 'FofShareSocialModal Modal--small';
    }

    title() {
        return app.translator.trans('fof-share-social.forum.modal.title');
    }

    content() {
        const url = encodeURIComponent(app.forum.attribute('baseUrl') + app.route('discussion', { id: this.discussion.id() }));
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
                        {this.networks.map(network =>
                            Button.component({
                                className: `Button Button--rounded Button--block Share--${network}`,
                                icon: `${shareIcons[network] || `fab fa-${network}`} fa-lg fa-fw`,
                                children: app.translator.trans(`fof-share-social.lib.networks.${network}`),
                                onclick: () => window.open(pupa(shareUrls[network], data), app.title, windowParams),
                            })
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
