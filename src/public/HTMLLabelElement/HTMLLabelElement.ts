import HTMLElement from '@/public/HTMLElement';
import { disposeLabelledControlOf, labelledControlOf } from '@/public/HTMLLabelElement/associations/labelledControl';

export const HTMLLabelElement = function(this: HTMLLabelElement) {
	throw new TypeError('Failed to construct \'HTMLLabelElement\': Illegal constructor');
} as unknown as typeof global.HTMLLabelElement;

Object.defineProperties(HTMLLabelElement, {
	prototype: {
		value: Object.seal(Object.create(HTMLElement.prototype, {
			control: {
				get(this: HTMLLabelElement) {
					return labelledControlOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			form: {
				get(this: HTMLLabelElement) {
					return this.nodeName;
				},
				configurable: true,
				enumerable: true,
			},
			htmlFor: {
				get(this: HTMLLabelElement) {
					return this.nodeName;
				},
				configurable: true,
				enumerable: true,
			},
			constructor: {
				value: HTMLLabelElement,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: HTMLLabelElement) {
					disposeLabelledControlOf(this);

					if (Symbol.dispose in HTMLElement.prototype) {
						(HTMLElement.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: HTMLLabelElement) {
					disposeLabelledControlOf(this);

					if (Symbol.asyncDispose in HTMLElement.prototype) {
						await (HTMLElement.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'HTMLLabelElement',
				configurable: true,
			}
		})),
	},
});

Object.seal(HTMLLabelElement);

if (!globalThis.HTMLLabelElement) {
	globalThis.HTMLLabelElement = HTMLLabelElement;
}

/**
 * Checks that an `unknown` value is an {@link HTMLLabelElement}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link HTMLLabelElement} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link HTMLLabelElement}.
 */
export const isHTMLLabelElement = (value: unknown): value is HTMLLabelElement =>
	typeof globalThis.HTMLLabelElement !== 'undefined' &&
	value instanceof globalThis.HTMLLabelElement;

export default HTMLLabelElement;
