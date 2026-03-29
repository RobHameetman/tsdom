/**
 * @see https://w3c.github.io/trusted-types/dist/spec/#typedefdef-trustedtype
 */
export type TrustedType = TrustedHTML | TrustedScript | TrustedScriptURL;

/**
 * Checks that an `unknown` value is an {@link TrustedType}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TrustedType`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link TrustedType}.
 */
export const isTrustedType = (value: unknown): value is TrustedType => (
	value instanceof TrustedHTML ||
	value instanceof TrustedScript ||
	value instanceof TrustedScriptURL
);
