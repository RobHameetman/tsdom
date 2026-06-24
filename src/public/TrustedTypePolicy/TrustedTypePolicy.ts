import implOf from '#_internals/impl';
import { dataOf, initializeDataOf } from '#security/TrustedTypePolicy/associations/data';

/**
 * Policy objects implement a {@link TrustedTypePolicy} interface and define a
 * group of functions creating {@link TrustedType} objects. Each of the
 * `create*` functions converts a string value to a given {@link TrustedType}
 * variant, or throws a `TypeError` if a conversion of a given value is
 * disallowed.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedtypepolicy
 */
export const TrustedTypePolicy = implOf<typeof global.TrustedTypePolicy>(
	function TrustedTypePolicy(this: TrustedTypePolicy) {
		// throw new TypeError('Failed to construct \'TrustedTypePolicy\': Illegal constructor');
		return this;
	}, {
		onInit: (instance) => {
			initializeDataOf(instance);
		}
	}
);

Object.defineProperties(TrustedTypePolicy, {
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
				value(this: TrustedTypePolicy) {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TrustedTypePolicy,
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TrustedTypePolicy',
				configurable: true,
			},
		})),
	},
});

Object.seal(TrustedTypePolicy);

if (!globalThis.TrustedTypePolicy) {
	globalThis.TrustedTypePolicy = TrustedTypePolicy;
}

/**
 * Checks that an `unknown` value is {@link TrustedTypePolicy}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedTypePolicy`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedTypePolicy}.
 */
export const isTrustedTypePolicy = (value: unknown): value is TrustedTypePolicy =>
	value instanceof TrustedTypePolicy;
