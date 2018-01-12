/** Define some Marshallers for [ISO639]{@link https://en.wikipedia.org/wiki/ISO_639} language codes. */

/** Imports. Also so typedoc works correctly. */

import { StringMarshaller, ExtractError } from 'raynor'

/** @private */
const _localeCode = require('locale-code')
/** @private */
const _languages = require('iso-639-1')


/**
 * A {@link Marshaller} for [ISO639]{@link https://en.wikipedia.org/wiki/ISO_639} language codes.
 */
export class LanguageMarshaller extends StringMarshaller {
    filter(language: string): string {
        if (!_languages.validate(language)) {
            throw new ExtractError('Expected a valid language');
        }

        return language;
    }
}


/**
 * A {@link Marshaller} for [ISO639]{@link https://en.wikipedia.org/wiki/ISO_639} language codes extracted from locale codes.
 */
export class LanguageFromLocaleMarshaller extends StringMarshaller {
    filter(locale: string): string {
        const cleanedLocale = locale.replace('_', '-');

        if (!_localeCode.validateLanguageCode(cleanedLocale)) {
            throw new ExtractError('Expected a valid locale');
        }

        return _localeCode.getLanguageCode(cleanedLocale);
    }
}
