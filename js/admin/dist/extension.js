'use strict';

System.register('avatar4eg/share-social/components/ShareSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, Switch, ShareSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            ShareSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(ShareSettingsModal, _SettingsModal);

                function ShareSettingsModal() {
                    babelHelpers.classCallCheck(this, ShareSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ShareSettingsModal).apply(this, arguments));
                }

                babelHelpers.createClass(ShareSettingsModal, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(Object.getPrototypeOf(ShareSettingsModal.prototype), 'init', this).call(this);

                        this.settingsPrefix = 'avatar4eg.share-social';
                        this.localePrefix = 'avatar4eg-share-social.admin.settings';

                        this.checkboxesSocial = app.settings[this.addPrefix('settings', 'list')] ? JSON.parse(app.settings[this.addPrefix('settings', 'list')]) : [];
                        this.checkboxesMetatags = ['open_graph', 'twitter_card'];

                        this.checkboxesSocial.forEach(function (key) {
                            return _this2.settings[_this2.addPrefix('settings', key)] = m.prop(app.settings[_this2.addPrefix('settings', key)] === '1');
                        });
                        this.checkboxesMetatags.forEach(function (key) {
                            return _this2.settings[_this2.addPrefix('settings', key)] = m.prop(app.settings[_this2.addPrefix('settings', key)] === '1');
                        });
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans(this.addPrefix('locale', 'modal_title'));
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        var parent = this;

                        return [this.checkboxesSocial.length !== 0 ? m('div', { className: 'Form-group' }, [m('label', {}, app.translator.trans(parent.addPrefix('locale', 'socials_label'))), this.checkboxesSocial.map(function (key) {
                            return Switch.component({
                                state: parent.settings[parent.addPrefix('settings', key)]() || false,
                                children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                                onchange: parent.settings[parent.addPrefix('settings', key)]
                            });
                        })]) : '', m('div', { className: 'Form-group' }, [m('label', {}, app.translator.trans(parent.addPrefix('locale', 'metatags_label'))), this.checkboxesMetatags.map(function (key) {
                            return Switch.component({
                                state: parent.settings[parent.addPrefix('settings', key)]() || false,
                                children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                                onchange: parent.settings[parent.addPrefix('settings', key)]
                            });
                        })])];
                    }
                }, {
                    key: 'dirty',
                    value: function dirty() {
                        var _this3 = this;

                        var dirty = {};

                        Object.keys(this.settings).forEach(function (key) {
                            var value = _this3.settings[key]();

                            if (typeof value === 'boolean') {
                                value = value ? '1' : '0';
                            }

                            if (value !== app.settings[key]) {
                                dirty[key] = value;
                            }
                        });

                        return dirty;
                    }
                }, {
                    key: 'addPrefix',
                    value: function addPrefix(type, key) {
                        switch (type) {
                            case 'settings':
                                return this.settingsPrefix + '.' + key;
                            case 'locale':
                                return this.localePrefix + '.' + key;
                            default:
                                return key;
                        }
                    }
                }]);
                return ShareSettingsModal;
            }(SettingsModal);

            _export('default', ShareSettingsModal);
        }
    };
});;
'use strict';

System.register('avatar4eg/share-social/main', ['flarum/extend', 'flarum/app', 'avatar4eg/share-social/components/ShareSettingsModal'], function (_export, _context) {
    "use strict";

    var extend, app, ShareSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_avatar4egShareSocialComponentsShareSettingsModal) {
            ShareSettingsModal = _avatar4egShareSocialComponentsShareSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('avatar4eg-share-social', function (app) {
                app.extensionSettings['avatar4eg-share-social'] = function () {
                    return app.modal.show(new ShareSettingsModal());
                };
            });
        }
    };
});