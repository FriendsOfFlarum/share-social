'use strict';

System.register('avatar4eg/share-social/components/ShareSocialSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch', 'flarum/utils/saveSettings'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, Switch, saveSettings, ShareSocialSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }],
        execute: function () {
            ShareSocialSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(ShareSocialSettingsModal, _SettingsModal);

                function ShareSocialSettingsModal() {
                    babelHelpers.classCallCheck(this, ShareSocialSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ShareSocialSettingsModal).apply(this, arguments));
                }

                babelHelpers.createClass(ShareSocialSettingsModal, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(Object.getPrototypeOf(ShareSocialSettingsModal.prototype), 'init', this).call(this);

                        this.settingsPrefix = 'avatar4eg.share-social';
                        this.localePrefix = 'avatar4eg-share-social.admin.settings';

                        var settings = app.settings;
                        this.checkboxesSocial = app.settings[this.addPrefix('settings', 'list')] ? JSON.parse(app.settings[this.addPrefix('settings', 'list')]) : [];

                        this.checkboxesMetatags = ['open_graph', 'twitter_card'];

                        this.values = {};
                        this.checkboxesSocial.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix('settings', key)] === '1');
                        });
                        this.checkboxesMetatags.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix('settings', key)] === '1');
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
                                state: parent.values[key]() || false,
                                children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                                onchange: parent.values[key]
                            });
                        })]) : '', m('div', { className: 'Form-group' }, [m('label', {}, app.translator.trans(parent.addPrefix('locale', 'metatags_label'))), this.checkboxesMetatags.map(function (key) {
                            return Switch.component({
                                state: parent.values[key]() || false,
                                children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                                onchange: parent.values[key]
                            });
                        })])];
                    }
                }, {
                    key: 'changed',
                    value: function changed() {
                        var _this3 = this;

                        var fieldsCheck = this.checkboxesSocial.some(function (key) {
                            return _this3.values[key]() !== (app.settings[_this3.addPrefix('settings', key)] == '1');
                        });
                        var checkboxesCheck = this.checkboxesMetatags.some(function (key) {
                            return _this3.values[key]() !== (app.settings[_this3.addPrefix('settings', key)] == '1');
                        });
                        return fieldsCheck || checkboxesCheck;
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this4 = this;

                        e.preventDefault();
                        if (this.loading) return;

                        this.loading = true;
                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        this.checkboxesSocial.forEach(function (key) {
                            return settings[_this4.addPrefix('settings', key)] = _this4.values[key]();
                        });
                        this.checkboxesMetatags.forEach(function (key) {
                            return settings[_this4.addPrefix('settings', key)] = _this4.values[key]();
                        });

                        console.log(settings);

                        saveSettings(settings).then(this.hide.bind(this), this.loaded.bind(this));
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
                return ShareSocialSettingsModal;
            }(SettingsModal);

            _export('default', ShareSocialSettingsModal);
        }
    };
});;
'use strict';

System.register('avatar4eg/share-social/main', ['flarum/extend', 'flarum/app', 'avatar4eg/share-social/components/ShareSocialSettingsModal'], function (_export, _context) {
    "use strict";

    var extend, app, ShareSocialSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_avatar4egShareSocialComponentsShareSocialSettingsModal) {
            ShareSocialSettingsModal = _avatar4egShareSocialComponentsShareSocialSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('avatar4eg-share-social', function (app) {
                app.extensionSettings['avatar4eg-share-social'] = function () {
                    return app.modal.show(new ShareSocialSettingsModal());
                };
            });
        }
    };
});