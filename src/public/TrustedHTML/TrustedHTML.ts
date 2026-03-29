import implOf from '@/_internals/impl';
import { dataOf, initializeDataOf } from '@/security/TrustedHTML/associations/data';

/**
 * The {@link TrustedHTML} interface represents a string that a developer can
 * confidently insert into an injection sink that will render it as HTML. These
 * objects are immutable wrappers around a string, constructed via a
 * {@link TrustedTypePolicy}’s createHTML method.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedhtml
 */
export const TrustedHTML = implOf<typeof global.TrustedHTML>(
	function TrustedHTML(this: TrustedHTML) {
		// throw new TypeError('Failed to construct \'TrustedHTML\': Illegal constructor');
		return this;
	}, {
		onInit: (instance) => {
			initializeDataOf(instance);
		}
	}
);

Object.defineProperties(TrustedHTML, {
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
				value(this: TrustedHTML) {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TrustedHTML,
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TrustedHTML',
				configurable: true,
			},
		})),
	},
});

Object.seal(TrustedHTML);

if (!globalThis.TrustedHTML) {
	globalThis.TrustedHTML = TrustedHTML;
}

/**
 * Checks that an `unknown` value is {@link TrustedHTML}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedHTML`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedHTML}.
 */
export const isTrustedHTML = (value: unknown): value is TrustedHTML =>
	value instanceof TrustedHTML;
