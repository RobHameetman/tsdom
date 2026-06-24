import isString from '#_internals/utils/functions/isString';

/**
 * A list of all possible {@link Namespace} values.
 */
export enum Namespace {
	Html = 'http://www.w3.org/1999/xhtml',
	Svg = 'http://www.w3.org/2000/svg',
	Mathml = 'http://www.w3.org/1998/Math/MathML',
	Xml = 'http://www.w3.org/XML/1998/namespace',
	Xmlns = 'http://www.w3.org/2000/xmlns/',
	Xlink = 'http://www.w3.org/1999/xlink',
	Default = Html,
}

/**
 * A list of all {@link Namespace} values.
 */
export const NAMESPACES = Object.freeze(
	Object.values(Namespace).filter(isString),
);

/**
 * Checks that an `unknown` value is a {@link Namespace}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a string key
 *     of {@link Namespaces}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Namespace}.
 */
export const isNamespace = (value: unknown): value is Namespace =>
	NAMESPACES.includes(value as Namespace);

export default Namespace;
