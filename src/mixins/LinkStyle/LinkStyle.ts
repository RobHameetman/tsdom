import isObject from '#_internals/utils/functions/isObject';

export const LinkStyle = <T extends CharacterData = CharacterData>(prototype: T) =>
	Object.defineProperties(prototype, {
		sheet: {
			get(this: T & LinkStyle) {
				return null as CSSStyleSheet | null;
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & LinkStyle;

/**
 * Checks that an `unknown` value is an {@link ProcessingInstruction} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `ProcessingInstruction`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link ProcessingInstruction} node.
 */
export const isLinkStyle = (value: unknown): value is LinkStyle =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.sheet
	 */
	'sheet' in value &&
	(value.sheet === null || value.sheet instanceof CSSStyleSheet);

export default LinkStyle;
