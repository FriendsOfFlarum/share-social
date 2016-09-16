'use strict';

System.register('avatar4eg/share-social/addMetaTags', ['flarum/app', 'flarum/components/DiscussionPage', 'flarum/extend', 'flarum/utils/string'], function (_export, _context) {
    "use strict";

    var app, DiscussionPage, extend, truncate, getPlainContent;

    _export('default', function () {
        extend(DiscussionPage.prototype, 'show', function () {
            var open_graph = false;
            var twitter_card = false;

            if (app.forum.attribute('shareSocialOpenGraph') && app.forum.attribute('shareSocialOpenGraph') === '1') {
                open_graph = true;
            }
            if (app.forum.attribute('shareSocialTwitterCard') && app.forum.attribute('shareSocialTwitterCard') === '1') {
                twitter_card = true;
            }

            if (open_graph || twitter_card) {
                var title = this.discussion.title();
                var url = app.forum.attribute('baseUrl') + '/d/' + this.discussion.id();
            }
            var description = '';
            if (this.discussion.startPost()) {
                description = truncate(getPlainContent(this.discussion.startPost().contentHtml()), 150, 0).replace(/\s+/, ' ').trim();
            }

            $('meta[name=description]').attr('content', description);
            if (open_graph) {
                $('meta[property=og\\:title]').attr('content', title);
                $('meta[property=og\\:url]').attr('content', url);
                $('meta[property=og\\:description]').attr('content', description);
            }
            if (twitter_card) {
                $('meta[property=twitter\\:title]').attr('content', title);
                $('meta[property=twitter\\:url]').attr('content', url);
                $('meta[property=twitter\\:description]').attr('content', description);
            }
        });

        extend(DiscussionPage.prototype, 'onunload', function () {
            if (this.discussion) {
                var idParam = m.route.param('id');

                if (!idParam || idParam && idParam.split('-')[0] !== this.discussion.id()) {
                    var open_graph = false;
                    var twitter_card = false;

                    if (app.forum.attribute('shareSocialOpenGraph') && app.forum.attribute('shareSocialOpenGraph') === '1') {
                        open_graph = true;
                    }
                    if (app.forum.attribute('shareSocialTwitterCard') && app.forum.attribute('shareSocialTwitterCard') === '1') {
                        twitter_card = true;
                    }

                    if (open_graph || twitter_card) {
                        var title = app.forum.attribute('welcomeTitle');
                        var url = app.forum.attribute('baseUrl');
                    }
                    var description = app.forum.attribute('description');

                    $('meta[name=description]').attr('content', description);
                    if (open_graph) {
                        $('meta[property=og\\:title]').attr('content', title);
                        $('meta[property=og\\:url]').attr('content', url);
                        $('meta[property=og\\:description]').attr('content', description);
                    }
                    if (twitter_card) {
                        $('meta[property=twitter\\:title]').attr('content', title);
                        $('meta[property=twitter\\:url]').attr('content', url);
                        $('meta[property=twitter\\:description]').attr('content', description);
                    }
                }
            }
        });
    });

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumUtilsString) {
            truncate = _flarumUtilsString.truncate;
            getPlainContent = _flarumUtilsString.getPlainContent;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('avatar4eg/share-social/components/ShareModal', ['flarum/app', 'flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string'], function (_export, _context) {
    "use strict";

    var app, Modal, Button, truncate, getPlainContent, ShareModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsString) {
            truncate = _flarumUtilsString.truncate;
            getPlainContent = _flarumUtilsString.getPlainContent;
        }],
        execute: function () {
            ShareModal = function (_Modal) {
                babelHelpers.inherits(ShareModal, _Modal);

                function ShareModal() {
                    babelHelpers.classCallCheck(this, ShareModal);
                    return babelHelpers.possibleConstructorReturn(this, (ShareModal.__proto__ || Object.getPrototypeOf(ShareModal)).apply(this, arguments));
                }

                babelHelpers.createClass(ShareModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(ShareModal.prototype.__proto__ || Object.getPrototypeOf(ShareModal.prototype), 'init', this).call(this);

                        this.localePrefix = 'avatar4eg-share-social.forum';

                        this.socialButtons = this.props.socialButtons;
                        this.discussion = this.props.discussion;
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans(this.addPrefix('modal_title'));
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var parent = this;

                        var share_url = encodeURIComponent(app.forum.attribute('baseUrl')) + '/d/' + this.discussion.id();
                        var share_title = encodeURIComponent(app.title);
                        var share_description = this.discussion.startPost() ? encodeURIComponent(truncate(getPlainContent(this.discussion.startPost().contentHtml()), 150, 0)) : '';
                        var width = 1000;
                        var height = 500;
                        var top = $(window).height() / 2 - height / 2;
                        var left = $(window).width() / 2 - width / 2;
                        var window_params = 'width=' + width + ', height= ' + height + ', top=' + top + ', left=' + left + ', status=no, scrollbars=no, resizable=no';

                        return [m('div', { className: 'Modal-body ShareSocialModal' }, [m('div', { className: 'Form Form--centered' }, [m('div', { className: 'Form-group' }, m('ul', { className: 'ShareList' }, [this.socialButtons.map(function (key) {
                            switch (key) {
                                case 'facebook':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'facebook fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//facebook.com/sharer/sharer.php?u=' + share_url, app.title, window_params);
                                        }
                                    }));
                                case 'vkontakte':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'vk fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//vk.com/share.php?url=' + share_url + '&title=' + share_title + '&description=' + share_description, app.title, window_params);
                                        }
                                    }));
                                case 'twitter':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'twitter fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//twitter.com/share?url=' + share_url + '&text=' + share_title, app.title, window_params);
                                        }
                                    }));
                                case 'google_plus':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'google-plus fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//plus.google.com/share?url=' + share_url, app.title, window_params);
                                        }
                                    }));
                                case 'odnoklassniki':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'odnoklassniki fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//connect.ok.ru/offer?url=' + share_url, app.title, window_params);
                                        }
                                    }));
                                case 'my_mail':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'at fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//connect.mail.ru/share?url=' + share_url + '&title=' + share_title + '&description=' + share_description, app.title, window_params);
                                        }
                                    }));
                                case 'linkedin':
                                    return m('li', { className: 'ShareItem' }, Button.component({
                                        className: 'Button Button--rounded Share--' + key,
                                        icon: 'linkedin fa-lg fa-fw',
                                        children: app.translator.trans(parent.addPrefix(key + '_button')),
                                        onclick: function onclick() {
                                            window.open('//linkedin.com/shareArticle?mini=true&url=' + share_url + '&title=' + share_title + '&summary=' + share_description, app.title, window_params);
                                        }
                                    }));
                                default:
                                    return '';
                            }
                        })]))])])];
                    }
                }, {
                    key: 'addPrefix',
                    value: function addPrefix(key) {
                        return this.localePrefix + '.' + key;
                    }
                }]);
                return ShareModal;
            }(Modal);

            _export('default', ShareModal);
        }
    };
});;
'use strict';

System.register('avatar4eg/share-social/main', ['flarum/app', 'flarum/components/DiscussionPage', 'flarum/components/Button', 'flarum/extend', 'avatar4eg/share-social/components/ShareModal', 'avatar4eg/share-social/addMetaTags'], function (_export, _context) {
    "use strict";

    var app, DiscussionPage, Button, extend, ShareModal, addMetaTags;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_avatar4egShareSocialComponentsShareModal) {
            ShareModal = _avatar4egShareSocialComponentsShareModal.default;
        }, function (_avatar4egShareSocialAddMetaTags) {
            addMetaTags = _avatar4egShareSocialAddMetaTags.default;
        }],
        execute: function () {

            app.initializers.add('avatar4eg-share-social', function () {
                addMetaTags();

                extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
                    var socialButtons = app.forum.attribute('shareSocialButtons') ? JSON.parse(app.forum.attribute('shareSocialButtons')) : [];
                    if (socialButtons.length > 0) {
                        items.add('share-social', Button.component({
                            className: 'Button Button-icon Button--share',
                            icon: 'share-alt',
                            children: app.translator.trans('avatar4eg-share-social.forum.share_button'),
                            onclick: function onclick() {
                                app.modal.show(new ShareModal({
                                    'socialButtons': socialButtons,
                                    'discussion': app.current.discussion
                                }));
                            }
                        }), -1);
                    }
                });
            });
        }
    };
});