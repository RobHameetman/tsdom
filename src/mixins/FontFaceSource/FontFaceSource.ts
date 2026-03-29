import { isObject, isUndefined } from '@com.robhameetman/utils';
import { isHTMLSlotElement } from '@/public/HTMLSlotElement';

export const FontFaceSource = <T extends Document = Document>(prototype: T) =>
	Object.defineProperties(prototype, {
		fonts: {
			get(this: T & FontFaceSource) {
				return {} as FontFaceSet;
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & FontFaceSource;

/**
 * Checks that an `unknown` value is an {@link Node} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Node} node.
 */
export const isFontFaceSource = (value: unknown): value is FontFaceSource =>
	/**
	 * value
	 */
	(!isUndefined(window) && value instanceof Node) ||
		(isObject(value) &&
			/**
			 * value.fonts
			 */
			'fonts' in value &&
			(isHTMLSlotElement(value.fonts) || value.fonts === null));

export default FontFaceSource;
