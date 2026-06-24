import implOf from '#_internals/impl';
import { dataOf, initializeDataOf } from '#security/TrustedTypePolicyFactory/associations/data';

/**
 * The {@link TrustedTypePolicyFactory} interface represents a string that a developer can
 * confidently insert into an injection sink that will render it as HTML. These
 * objects are immutable wrappers around a string, constructed via a
 * {@link TrustedTypePolicy}’s createHTML method.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedtypepolicyfactory
 */
export const TrustedTypePolicyFactory = implOf<typeof global.TrustedTypePolicyFactory>(
	function TrustedTypePolicyFactory(this: TrustedTypePolicyFactory) {
		// throw new TypeError('Failed to construct \'TrustedTypePolicyFactory\': Illegal constructor');
		return this;
	}, {
		onInit: (instance) => {
			initializeDataOf(instance);
		}
	}
);

Object.defineProperties(TrustedTypePolicyFactory, {
	prototype: {
		value: Object.seal(Object.create(String.prototype, {
			toJSON: {
				value() {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			toString: {
				value(this: TrustedTypePolicyFactory) {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TrustedTypePolicyFactory,
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TrustedTypePolicyFactory',
				configurable: true,
			},
		})),
	},
});

Object.seal(TrustedTypePolicyFactory);

if (!globalThis.TrustedTypePolicyFactory) {
	globalThis.TrustedTypePolicyFactory = TrustedTypePolicyFactory;
}

/**
 * Checks that an `unknown` value is {@link TrustedTypePolicyFactory}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedTypePolicyFactory`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedTypePolicyFactory}.
 */
export const isTrustedTypePolicyFactory = (value: unknown): value is TrustedTypePolicyFactory =>
	value instanceof TrustedTypePolicyFactory;
