import ARIAMixin from '@/mixins/ARIAMixin';
import { isShadowHost, shadowRootOf } from '@/tree/ShadowTree/relationships/shadowRoots';
import nodeListOf from '@/public/NodeList';
import CustomStateSet from '@/public/CustomStateSet';
import ValidityState from '@/public/ValidityState';
import { targetElementOf } from '@/public/ElementInternals/associations/targetElement';
import { availableToElementInternalsOf } from '@/public/ShadowRoot/associations';

const withMixins = (prototype: Element) =>
	ARIAMixin(prototype);

export const ElementInternals = function(this: ElementInternals) {
	throw new TypeError('Failed to construct \'ElementInternals\': Illegal constructor');
} as unknown as typeof global.ElementInternals;

Object.defineProperties(ElementInternals, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Element.prototype, {
			form: {
				get() {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			labels: {
				get() {
					const labels = Object.create(NodeList.prototype) as NodeListOf<HTMLLabelElement>;

					return labels;
				},
				configurable: true,
				enumerable: true,
			},
			shadowRoot: {
				get() {
					const target = targetElementOf(this);

					if (!isShadowHost(target)) {
						return null;
					}

					const shadow = shadowRootOf(target) as ShadowRoot;

					if (!availableToElementInternalsOf(shadow)) {
						return null;
					}

					return shadow;
				},
				configurable: true,
				enumerable: true,
			},
			states: {
				get() {
					const states = Object.create(CustomStateSet.prototype);

					CustomStateSet.call(states);

					return states;
				},
				configurable: true,
				enumerable: true,
			},
			validationMessage: {
				get() {
					return '';
				},
				configurable: true,
				enumerable: true,
			},
			validity: {
				get() {
					const validity = Object.create(ValidityState.prototype);

					ValidityState.call(validity);

					return validity;
				},
				configurable: true,
				enumerable: true,
			},
			willValidate: {
				get() {
					return false;
				},
				configurable: true,
				enumerable: true,
			},
			checkValidity: {
				value() {
					return true;
				},
				configurable: true,
				enumerable: true,
			},
			reportValidity: {
				value() {
					return true;
				},
				configurable: true,
				enumerable: true,
			},
			setFormValue: {
				value(_value: File | string | FormData | null, _state?: File | string | FormData | null) {},
				configurable: true,
				enumerable: true,
			},
			setValidity: {
				value(_flags?: ValidityStateFlags, _message?: string, _anchor?: HTMLElement) {},
				configurable: true,
				enumerable: true,
			},
		}))),
	},
});

Object.seal(ElementInternals);

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
export const isElementInternals = (value: unknown): value is ElementInternals =>
	typeof globalThis.ElementInternals !== 'undefined' &&
	value instanceof globalThis.ElementInternals;

export default ElementInternals;
