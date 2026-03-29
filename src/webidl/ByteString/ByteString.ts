/**
 * ByteString represents a sequence of 8-bit bytes (non-negative integers). Each
 * byte must be in the range 0..255. In JavaScript, this is represented as a
 * string where each character's code unit value is in the range 0..255. The
 * {@link ByteString} type corresponds to byte sequences.
 *
 * @see https://webidl.spec.whatwg.org/#idl-ByteString
 * @see https://infra.spec.whatwg.org/#byte-sequence
 */
// export type ByteString = string;

/**
 * Checks that an `unknown` value is a {@link ByteString}.
 *
 * Requirements:
 *   - `value` must be a string whose code units are all in the range 0..255.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link ByteString}.
 */
export const isByteString = (value: unknown): value is ByteString =>
	typeof value === 'string' &&
	!value.split('').some((_, index) => value.charCodeAt(index) > 255);
