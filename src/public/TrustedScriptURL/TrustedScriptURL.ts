import implOf from '#_internals/impl';
import { dataOf, initializeDataOf } from '#security/TrustedScriptURL/associations/data';

/**
 * The {@link TrustedScriptURL} interface represents a string that a developer can
 * confidently insert into an injection sink that will render it as HTML. These
 * objects are immutable wrappers around a string, constructed via a
 * {@link TrustedTypePolicy}’s createHTML method.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedscripturl
 */
export const TrustedScriptURL = implOf<typeof global.TrustedScriptURL>(
	function TrustedScriptURL(this: TrustedScriptURL) {
		// throw new TypeError('Failed to construct \'TrustedScriptURL\': Illegal constructor');
		return this;
	}, {
		onInit: (instance) => {
			initializeDataOf(instance);
		}
	}
);

Object.defineProperties(TrustedScriptURL, {
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
				value(this: TrustedScriptURL) {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TrustedScriptURL,
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TrustedScriptURL',
				configurable: true,
			},
		})),
	},
});

Object.seal(TrustedScriptURL);

if (!globalThis.TrustedScriptURL) {
	globalThis.TrustedScriptURL = TrustedScriptURL;
}

/**
 * Checks that an `unknown` value is {@link TrustedScriptURL}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedScriptURL`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedScriptURL}.
 */
export const isTrustedScriptURL = (value: unknown): value is TrustedScriptURL =>
	value instanceof TrustedScriptURL;
