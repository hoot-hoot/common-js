import { expect } from 'chai'
import 'mocha'

import { LanguageMarshaller, LanguageFromLocaleMarshaller } from './language'

const languages = require('iso-639-1');
const countryCodes = require('iso-3166-1-alpha-2');


describe('LanguageFromLocaleMarshaller', () => {
    const NonLanguageCodes = [
        '',
        'hello',
        'CZ',
        'fr',
        'fr+EN'
    ];

    describe('extract', () => {
        for (let langCode of languages.getAllCodes()) {
            for (let countryCode of countryCodes.getCodes().slice(0, 3)) {
                it (`should parse "${langCode}-${countryCode}"`, () => {
                    const languageFromLocaleMarshaller = new LanguageFromLocaleMarshaller();
                    expect(languageFromLocaleMarshaller.extract(`${langCode}-${countryCode}`)).to.equal(langCode);
                    expect(languageFromLocaleMarshaller.extract(`${langCode}_${countryCode}`)).to.equal(langCode);
                });
            }
        }

        for (let nonLangCode of NonLanguageCodes) {
            it (`should throw for non-lang-code "${nonLangCode}`, () => {
                const languageFromLocaleMarshaller = new LanguageFromLocaleMarshaller();
                expect(() => languageFromLocaleMarshaller.extract(nonLangCode)).to.throw('Expected a valid locale');
            });
        }
    });

    describe('pack', () => {
        for (let langCode of languages.getAllCodes()) {
            it (`should produce the same input for "${langCode}`, () => {
                const languageFromLocaleMarshaller = new LanguageFromLocaleMarshaller();
                expect(languageFromLocaleMarshaller.pack(langCode)).to.equal(langCode);
            });
        }
    });
})


describe('LanguageMarshaller', () => {
    const NonLanguageCodes = [
        '',
        'hello',
        'CZ'
    ];

    describe('extract', () => {
        for (let langCode of languages.getAllCodes()) {
            it (`should parse "${langCode}"`, () => {
                const languageMarshaller = new LanguageMarshaller();
                expect(languageMarshaller.extract(langCode)).to.equal(langCode);
            });
        }

        for (let nonLangCode of NonLanguageCodes) {
            it (`should throw for non-lang-code "${nonLangCode}`, () => {
                const languageMarshaller = new LanguageMarshaller();
                expect(() => languageMarshaller.extract(nonLangCode)).to.throw('Expected a valid language');
            });
        }
    });

    describe('pack', () => {
        for (let langCode of languages.getAllCodes()) {
            it (`should produce the same input for "${langCode}`, () => {
                const languageMarshaller = new LanguageMarshaller();
                expect(languageMarshaller.pack(langCode)).to.equal(langCode);
            });
        }
    });

    describe('extract and pack', () => {
        for (let langCode of languages.getAllCodes()) {
            it (`should be opposites for "${langCode}"`, () => {
                const languageMarshaller = new LanguageMarshaller();

                const raw = langCode;
                const extracted = languageMarshaller.extract(raw);
                const packed = languageMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
})
