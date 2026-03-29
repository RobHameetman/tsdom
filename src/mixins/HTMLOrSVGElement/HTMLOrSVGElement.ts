export const HTMLOrSVGElement = <E extends Element = Element>(prototype: E) =>
	Object.defineProperties(prototype, {
		autofocus: {
			get(this: E & HTMLOrSVGElement) {
				return this.hasAttributeNS(null, 'autofocus');
			},
			set(this: E & HTMLOrSVGElement, value: boolean) {
				if (value) {
					this.setAttributeNS(null, 'autofocus', '');
				} else {
					this.removeAttributeNS(null, 'autofocus');
				}
			},
			configurable: true,
			enumerable: true,
		},
		dataset: {
			get(this: E & HTMLOrSVGElement) {
				/**
				 * @TODO
				 */
			},
			configurable: true,
			enumerable: true,
		},
		nonce: {
			get(this: E & HTMLOrSVGElement) {
				return this.getAttributeNS(null, 'nonce') || '';
			},
			set(this: E & HTMLOrSVGElement, value: string) {
				this.setAttributeNS(null, 'nonce', value);
			},
			configurable: true,
			enumerable: true,
		},
		tabIndex: {
			get(this: E & HTMLOrSVGElement) {
				const tabindex = this.getAttributeNS(null, 'tabindex');

				return tabindex !== null ? Number(tabindex) : -1;
			},
			set(this: E & HTMLOrSVGElement, value: number) {
				this.setAttributeNS(null, 'tabindex', String(value));
			},
			configurable: true,
			enumerable: true,
		},
		blur: {
			value(this: E & HTMLOrSVGElement) {
				const event = Object.create(FocusEvent.prototype);

				FocusEvent.call(event, 'blur', {
					bubbles: false,
					cancelable: false,
					composed: true,
				});

				this.dispatchEvent(event);
			},
			configurable: true,
			enumerable: true,
		},
		focus: {
			value(this: E & HTMLOrSVGElement, options = {} as FocusOptions) {
				const event = Object.create(FocusEvent.prototype);

				FocusEvent.call(event, 'focus', {
					bubbles: false,
					cancelable: false,
					composed: true,
					...options,
				});

				this.dispatchEvent(event);
			},
			configurable: true,
			enumerable: true,
		},
	}) as E & HTMLOrSVGElement;

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
export const isHtmlOrSvgElement = (value: unknown): value is Element =>
	value instanceof Element;

export default HTMLOrSVGElement;
