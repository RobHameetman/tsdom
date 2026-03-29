import validCustomElementName from '@/algorithms/validCustomElementName';

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
export const validShadowHostName = (name: string) =>
	[
		'article',
		'aside',
		'blockquote',
		'body',
		'div',
		'footer',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'header',
		'main',
		'nav',
		'p',
		'section',
		'span',
	].includes(name) ||
	validCustomElementName(name);

export default validShadowHostName;
