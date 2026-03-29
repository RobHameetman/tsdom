/**
 * Determines whether a string is a valid attribute local name.
 *
 * A string is a valid attribute local name if its length is at least 1 and it
 * does not contain ASCII whitespace, U+0000 NULL, U+002F (/), U+003D (=), or
 * U+003E (>).
 *
 * @see https://dom.spec.whatwg.org/#valid-attribute-local-name
 *
 * @param localName - The local name to validate.
 *
 * @returns A boolean which is `true` if the local name is valid, `false`
 * otherwise.
 */
export const validAttributeLocalName = (localName: string) =>
	localName.length >= 1 &&
	!(/[ \\x00-\\x20\\/=>]/.test(localName));

export default validAttributeLocalName;
