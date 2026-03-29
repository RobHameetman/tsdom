import implOf from '@/_internals/impl';
import { dataOf, initializeDataOf } from '@/security/TrustedScript/associations/data';

/**
 * The {@link TrustedScript} interface represents a string that a developer can
 * confidently insert into an injection sink that will render it as HTML. These
 * objects are immutable wrappers around a string, constructed via a
 * {@link TrustedTypePolicy}’s createHTML method.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedscript
 */
export const TrustedScript = implOf<typeof global.TrustedScript>(
	function TrustedScript(this: TrustedScript) {
		// throw new TypeError('Failed to construct \'TrustedScript\': Illegal constructor');
		return this;
	}, {
		onInit: (instance) => {
			initializeDataOf(instance);
		}
	}
);

Object.defineProperties(TrustedScript, {
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
				value(this: TrustedScript) {
					return dataOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TrustedScript,
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TrustedScript',
				configurable: true,
			},
		})),
	},
});

Object.seal(TrustedScript);

if (!globalThis.TrustedScript) {
	globalThis.TrustedScript = TrustedScript;
}

/**
 * Checks that an `unknown` value is {@link TrustedScript}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedScript`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedScript}.
 */
export const isTrustedScript = (value: unknown): value is TrustedScript =>
	value instanceof TrustedScript;
