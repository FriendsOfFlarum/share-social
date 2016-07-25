import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';
import saveSettings from 'flarum/utils/saveSettings';

export default class ShareSettingsModal extends SettingsModal {
    init() {
        super.init();

        this.settingsPrefix = 'avatar4eg.share-social';
        this.localePrefix = 'avatar4eg-share-social.admin.settings';

        this.checkboxesSocial = app.settings[this.addPrefix('settings', 'list')] ? JSON.parse(app.settings[this.addPrefix('settings', 'list')]) : [];

        this.checkboxesMetatags = [
            'open_graph',
            'twitter_card'
        ];

        this.values = {};
        this.checkboxesSocial.forEach(key => this.values[key] = m.prop(app.settings[this.addPrefix('settings', key)] === '1'));
        this.checkboxesMetatags.forEach(key => this.values[key] = m.prop(app.settings[this.addPrefix('settings', key)] === '1'));
    }

    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans(this.addPrefix('locale', 'modal_title'));
    }

    form() {
        var parent = this;

        return [
            this.checkboxesSocial.length !== 0 ? m('div', {className: 'Form-group'}, [
                m('label', {}, app.translator.trans(parent.addPrefix('locale', 'socials_label'))),
                this.checkboxesSocial.map(function (key) {
                    return Switch.component({
                        state: parent.values[key]() || false,
                        children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                        onchange: parent.values[key]
                    })
                })
            ]) : '',
            m('div', {className: 'Form-group'}, [
                m('label', {}, app.translator.trans(parent.addPrefix('locale', 'metatags_label'))),
                this.checkboxesMetatags.map(function (key) {
                    return Switch.component({
                        state: parent.values[key]() || false,
                        children: app.translator.trans(parent.addPrefix('locale', key + '_label')),
                        onchange: parent.values[key]
                    })
                })
            ])
        ];
    }

    changed() {
        var fieldsCheck = this.checkboxesSocial.some(key => this.values[key]() !== (app.settings[this.addPrefix('settings', key)] == '1'));
        var checkboxesCheck = this.checkboxesMetatags.some(key => this.values[key]() !== (app.settings[this.addPrefix('settings', key)] == '1'));
        return fieldsCheck || checkboxesCheck;
    }

    onsubmit(e) {
        e.preventDefault();
        if (this.loading) return;

        this.loading = true;
        app.alerts.dismiss(this.successAlert);

        this.checkboxesSocial.forEach(key => this.settings[this.addPrefix('settings', key)] = this.values[key]);
        this.checkboxesMetatags.forEach(key => this.settings[this.addPrefix('settings', key)] = this.values[key]);

        saveSettings(this.dirty()).then(
            this.hide.bind(this),
            this.loaded.bind(this)
        );
    }

    addPrefix(type, key) {
        switch (type) {
            case 'settings':
                return this.settingsPrefix + '.' + key;
            case 'locale':
                return this.localePrefix + '.' + key;
            default:
                return key;
        }
    }
}