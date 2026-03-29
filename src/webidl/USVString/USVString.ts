import { UnicodeCaptureGroups } from '@com.robhameetman/utils';

/**
 * The USVString type corresponds to scalar value strings. Depending on the
 * context, these can be treated as sequences of code units or scalar values. A
 * scalar value string is a string whose code points are all scalar values. A
 * scalar value is a code point that is not a surrogate.
 *
 * @see https://webidl.spec.whatwg.org/#idl-USVString
 */
export type USVString = string;

/**
 * Checks that an `unknown` value is a {@link USVString}.
 *
 * Requirements:
 *   - `value` must be a string whose code units are not surrogates (U+D800..U+DFFF).
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link USVString}.
 */
export const isUSVString = (value: unknown): value is USVString =>
	typeof value === 'string' &&
	!RegExp(`[${UnicodeCaptureGroups.SurrPair}]`).test(value as string);
