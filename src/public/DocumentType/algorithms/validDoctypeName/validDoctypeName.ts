/**
 * Determines whether a string is a valid doctype name.
 *
 * A string is a valid doctype name if it does not contain ASCII whitespace,
 * U+0000 NULL, or U+003E (>). An empty string is a valid doctype name.
 *
 * @see https://dom.spec.whatwg.org/#valid-doctype-name
 *
 * @param name - The doctype name to validate.
 *
 * @returns A boolean which is `true` if the doctype name is valid, `false`
 * otherwise.
 */
export const validDoctypeName = (name: string) =>
	!(/[ \\x00->]/.test(name));

export default validDoctypeName;
