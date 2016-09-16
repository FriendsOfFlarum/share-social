import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { truncate } from 'flarum/utils/string'
import { getPlainContent } from 'flarum/utils/string'

export default class ShareModal extends Modal {
    init() {
        super.init();

        this.localePrefix = 'avatar4eg-share-social.forum';

        this.socialButtons = this.props.socialButtons;
        this.discussion = this.props.discussion;
    }

    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans(this.addPrefix('modal_title'));
    }

    content() {
        var parent = this;

        var share_url = encodeURIComponent(app.forum.attribute('baseUrl')) + '/d/' + this.discussion.id();
        var share_title = encodeURIComponent(app.title);
        var share_description = this.discussion.startPost() ? encodeURIComponent(truncate(getPlainContent(this.discussion.startPost().contentHtml()), 150, 0)) : '';
        const width = 1000;
        const height = 500;
        const top = $(window).height() / 2 - height / 2;
        const left = $(window).width() / 2 - width / 2;
        const window_params = 'width=' + width + ', height= ' + height + ', top=' + top + ', left=' + left + ', status=no, scrollbars=no, resizable=no';

        return [
            m('div', {className: 'Modal-body ShareSocialModal'}, [
                m('div', {className: 'Form Form--centered'}, [
                    m('div', {className: 'Form-group'},
                        m('ul', {className: 'ShareList'}, [
                            this.socialButtons.map(function (key) {
                                switch (key) {
                                    case 'facebook':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'facebook fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//facebook.com/sharer/sharer.php?u=' + share_url, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'vkontakte':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'vk fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: function onclick() {
                                                    window.open('//vk.com/share.php?url=' + share_url + '&title=' + share_title + '&description=' + share_description, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'twitter':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'twitter fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//twitter.com/share?url=' + share_url + '&text=' + share_title, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'google_plus':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'google-plus fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//plus.google.com/share?url=' + share_url, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'odnoklassniki':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'odnoklassniki fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//connect.ok.ru/offer?url=' + share_url, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'my_mail':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'at fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//connect.mail.ru/share?url=' + share_url + '&title=' + share_title + '&description=' + share_description, app.title, window_params);
                                                }
                                            })
                                        );
                                    case 'linkedin':
                                        return m('li', {className: 'ShareItem'},
                                            Button.component({
                                                className: 'Button Button--rounded Share--' + key,
                                                icon: 'linkedin fa-lg fa-fw',
                                                children: app.translator.trans(parent.addPrefix(key + '_button')),
                                                onclick: () => {
                                                    window.open('//linkedin.com/shareArticle?mini=true&url=' + share_url + '&title=' + share_title + '&summary=' + share_description, app.title, window_params);
                                                }
                                            })
                                        );
                                    default:
                                        return '';
                                }
                            })
                        ])
                    )
                ])
            ])
        ];
    }

    addPrefix(key) {
        return this.localePrefix + '.' + key;
    }
}
