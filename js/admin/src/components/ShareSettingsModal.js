import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

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

        this.checkboxesSocial.forEach(key => this.settings[this.addPrefix('settings', key)] = m.prop(app.settings[this.addPrefix('settings', key)] === '1'));
        this.checkboxesMetatags.forEach(key => this.settings[this.addPrefix('settings', key)] = m.prop(app.settings[this.addPrefix('settings', key)] === '1'));
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
                        state       : parent.settings[parent.addPrefix('settings', key)]() || false,
                        children    : app.translator.trans(parent.addPrefix('locale', key + '_label')),
                        onchange    : parent.settings[parent.addPrefix('settings', key)]
                    })
                })
            ]) : '',
            m('div', {className: 'Form-group'}, [
                m('label', {}, app.translator.trans(parent.addPrefix('locale', 'metatags_label'))),
                this.checkboxesMetatags.map(function (key) {
                    return Switch.component({
                        state       : parent.settings[parent.addPrefix('settings', key)]() || false,
                        children    : app.translator.trans(parent.addPrefix('locale', key + '_label')),
                        onchange    : parent.settings[parent.addPrefix('settings', key)]
                    })
                })
            ])
        ];
    }

    dirty() {
        const dirty = {};

        Object.keys(this.settings).forEach(key => {
            var value = this.settings[key]();

            if (typeof(value) === 'boolean') {
                value = value ? '1' : '0';
            }

            if (value !== app.settings[key]) {
                dirty[key] = value;
            }
        });

        return dirty;
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