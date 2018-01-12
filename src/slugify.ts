/** Helpers for slug-ification. */

/** Imports. Also so typedoc works correctly. */

/** @private */
const _slugifyBase = require('slugify');

/**
 * Slugifies a string. Meant to be used for "titles" of documents.
 * @param title - the title to be slugified.
 * @returns The slugified title.
 */
export function slugify(title: string): string {
    return _slugifyBase(title.toLowerCase());
}
