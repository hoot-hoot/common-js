/** Defines {@link Currency} and associated helpers. */

/** Imports. Also so typedoc works correctly. */
import { BaseStringMarshaller, ExtractError } from 'raynor'

/**
 * A currency.
 */
export class Currency {
    private readonly _name: string;

    /**
     * Constructs a currency with a given [ISO4217]{@link https://en.wikipedia.org/wiki/ISO_4217} code.
     * @params code - The ISO4217 currency code.
     */
    constructor(code: string) {
        this._name = code;
    }

    /**
     * Obtain the string representation of a currency instance.
     * @returns The string representation of a currency instance.
     */
    toString(): string {
        return this._name;
    }
}


/**
 * The set of allowed currencies. Used by {@link CurrencyMarshaller} as a whitelist.
 */
export const StandardCurrencies: any = {
    EUR: new Currency('EUR'),
    USD: new Currency('USD'),
    RON: new Currency('RON')
};


/**
 * A {@link Marshaller} for {@link Currency} objects.
 */
export class CurrencyMarshaller extends BaseStringMarshaller<Currency> {
    build(a: string): Currency {
        if (!StandardCurrencies.hasOwnProperty(a)) {
            throw new ExtractError('Expected a currency name');
        }

        return StandardCurrencies[a];
    }

    unbuild(currency: Currency): string {
        return currency.toString();
    }
}
