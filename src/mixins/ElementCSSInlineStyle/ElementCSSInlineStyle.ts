export const ElementCSSInlineStyle = <E extends Element = Element>(prototype: E) =>
	Object.defineProperties(prototype, {
		attributeStyleMap: {
			get(this: E & ElementCSSInlineStyle) {
				return stylePropertyMap();
			},
			enumerable: true,
			configurable: true,
		},
		style: {
			get(this: E & ElementCSSInlineStyle) {
				return cssStyleDeclaration();
			},
			set(this: E & ElementCSSInlineStyle, _value: CSSStyleDeclaration) {},
			enumerable: true,
			configurable: true,
		},
	}) as E & ElementCSSInlineStyle;

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const isElementCSSInlineStyle = (value: unknown): value is Element =>
	value instanceof Element;

export default ElementCSSInlineStyle;
