/**
 * A sequence of 16-bit units (UTF-16 code units). This corresponds to the
 * JavaScript `string` type.
 *
 * @see https://webidl.spec.whatwg.org/#idl-DOMString
 */
export type DOMString = string;

/**
 * Checks that an `unknown` value is a {@link DOMString}.
 *
 * Requirements:
 *   - `value` must be a string whose code units are all in the range 0..255.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link DOMString}.
 */
export const isDOMString = (value: unknown): value is DOMString =>
	typeof value === 'string';
