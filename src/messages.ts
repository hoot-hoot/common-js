/**
 * Defines types for translation system messages. A message is a map from a ISO 639-1 language code
 * to the string representation of the message in that language. The message can be parametrized
 * by up to 7 arguments.
 */

/** Imports. Also so typedoc works correctly. */
import * as r from 'raynor'

import { LanguageMarshaller } from './language'


/** A message where strings are not parametrized. */
export type MessageWith0Arg = { [key: string]: string };

/** A message where strings are parametrized with 1 argument. */
export type MessageWith1Arg = { [key: string]: (arg1: any) => string }

/** A message where strings are parametrized with 2 arguments. */
export type MessageWith2Arg = { [key: string]: (arg1: any, arg2: any) => string }

/** A message where strings are parametrized with 3 arguments. */
export type MessageWith3Arg = { [key: string]: (arg1: any, arg2: any, arg3: any) => string }

/** A message where strings are parametrized with 4 arguments. */
export type MessageWith4Arg = { [key: string]: (arg1: any, arg2: any, arg3: any, arg4: any) => string }

/** A message where strings are parametrized with 5 arguments. */
export type MessageWith5Arg = { [key: string]: (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any) => string }

/** A message where strings are parametrized with 6 arguments. */
export type MessageWith6Arg = { [key: string]: (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any) => string }

/** A message where strings are parametrized with 7 arguments. */
export type MessageWith7Arg = { [key: string]: (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any) => string }

/** The full message type. A message is a map from a ISO 639-1 language code
 * to the string representation of the message in that language. The message can be parametrized
 * by up to 7 arguments.
 */
export type Message =
    MessageWith0Arg |
    MessageWith1Arg |
    MessageWith2Arg |
    MessageWith3Arg |
    MessageWith4Arg |
    MessageWith5Arg |
    MessageWith6Arg |
    MessageWith7Arg;

/** A marshaller for {@link MessageWith0Arg}. */
export class MessageWith0ArgMarshaller implements r.Marshaller<MessageWith0Arg> {
    private readonly _mapMarshaller: r.MapMarshaller<string, string>;

    constructor() {
        this._mapMarshaller = new r.MapMarshaller(new LanguageMarshaller(), new r.StringMarshaller());
    }

    extract(raw: any): MessageWith0Arg {
        const mapResult = this._mapMarshaller.extract(raw);
        const result: MessageWith0Arg = {};

        for (let [k, v] of mapResult.entries()) {
            result[k] = v;
        }

        return result;
    }

    pack(message: MessageWith0Arg): any {
        const map = new Map<string, string>();
        for (let k of Object.keys(message)) {
            map.set(k, message[k]);
        }

        return this._mapMarshaller.pack(map);
    }
}
