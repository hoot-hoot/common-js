/** Helpers for working with user inputs on the UI side. */

/** Imports. Also so typedoc works correctly. */
import { Marshaller } from 'raynor'


/**
 * Represents a piece of user input. Records a validated value as well as information about whether
 * it's modified or not. There's a concept of a form provided value and an application value. So
 * the form value might be a string, whereas the application value might be an IBAN object.
 * @param TIn - the type of the input as received from a form control. This might be a simple type
 *     or a more complex object.
 * @param TOut - the type of the input as needed by the application.
 */
export class UserInput<TIn, TOut> {
    private readonly _userInput: TIn;
    private readonly _value: TOut;
    private readonly _modified: boolean;
    private readonly _invalid: boolean;

    constructor(userInput: TIn, value: TOut, modified: boolean = false, invalid: boolean = false) {
        this._userInput = userInput;
        this._value = value;
        this._modified = modified;
        this._invalid = invalid;
    }

    getUserInput(): TIn {
        return this._userInput;
    }

    getValue(): TOut {
        return this._value;
    }

    isModified(): boolean {
        return this._modified;
    }

    isInvalid(): boolean {
        return this._invalid;
    }
}


/**
 * A controller of the transformation between the form value of a user input and the application
 * value.
 */
export class UserInputMaster<TIn, TOut> {
    private readonly _marshaller: Marshaller<TOut>;

    constructor(marshaller: Marshaller<TOut>) {
        this._marshaller = marshaller;
    }

    transform(userInput: TIn, oldValue: TOut): UserInput<TIn, TOut> {
        try {
            let value = this._marshaller.extract(userInput);
            return new UserInput<TIn, TOut>(userInput, value, true, false);
        } catch (e) {
            if (e.name === 'ExtractError') {
                return new UserInput<TIn, TOut>(userInput, oldValue, true, true);
            }

            throw e;
        }
    }
}
