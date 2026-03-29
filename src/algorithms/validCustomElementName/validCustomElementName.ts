import { validElementLocalName } from '@/algorithms/validElementLocalName';

/**
 * Determines whether a string is a valid attribute local name.
 *
 * A string is a valid namespace prefix if its length is at least 1 and it
 * does not contain ASCII whitespace, U+0000 NULL, U+002F (/), or U+003E (>).
 *
 * @see https://dom.spec.whatwg.org/#valid-namespace-prefix
 *
 * @param namespace - The namespace prefix to validate.
 *
 * @returns A boolean which is `true` if the namespace prefix is valid, `false`
 * otherwise.
 */
export const validCustomElementName = (name: string) =>
	validElementLocalName(name) &&
	(name.charCodeAt(0) >= 0x61 && name.charCodeAt(0) <= 0x7A) &&
	!/[A-Z]/.test(name) &&
	name.includes('-') &&
	![
		'annotation-xml',
		'color-profile',
		'font-face',
		'font-face-src',
		'font-face-uri',
		'font-face-format',
		'font-face-name',
		'missing-glyph',
	].includes(name);

export default validCustomElementName;
