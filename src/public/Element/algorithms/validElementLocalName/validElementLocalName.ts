/**
 * Determines whether a string is a valid element local name.
 *
 * @see https://dom.spec.whatwg.org/#valid-element-local-name
 *
 * @param name - The local name to validate.
 *
 * @returns A boolean which is `true` if the local name is valid, `false`
 * otherwise.
 */
export const validElementLocalName = (name: string) =>
	/^(?:[A-Za-z][^\0\t\n\f\r\u0020/>]*|[:_\u0080-\u{10FFFF}][A-Za-z0-9-.:_\u0080-\u{10FFFF}]*)$/u.test(name);

export default validElementLocalName;
