export const ElementContentEditable = <E extends Element = Element>(prototype: E) =>
	Object.defineProperties(prototype, {
		contentEditable: {
			get(this: E & ElementContentEditable) {
				return this.getAttribute('contentEditable') || 'inherit';
			},
			set(this: E & ElementContentEditable, value: string) {
				this.setAttribute('contentEditable', value);
			},
			enumerable: true,
			configurable: true,
		},
		enterKeyHint: {
			get(this: E & ElementContentEditable) {
				return this.getAttribute('enterKeyHint') || '';
			},
			set(this: E & ElementContentEditable, value: string) {
				this.setAttribute('enterKeyHint', value);
			},
			enumerable: true,
			configurable: true,
		},
		inputMode: {
			get(this: E & ElementContentEditable) {
				return this.getAttribute('inputMode') || '';
			},
			set(this: E & ElementContentEditable, value: string) {
				this.setAttribute('inputMode', value);
			},
			enumerable: true,
			configurable: true,
		},
		isContentEditable: {
			get(this: E & ElementContentEditable) {
				return this.contentEditable === 'true' ||
					(this.contentEditable === 'inherit' &&
					this.parentElement?.isContentEditable === true);
			},
			enumerable: true,
			configurable: true,
		},
	}) as E & ElementContentEditable;

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
export const isElementContentEditable = (value: unknown): value is ElementContentEditable =>
	value instanceof Element;

export default ElementContentEditable;
