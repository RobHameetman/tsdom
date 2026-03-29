import type { DOMString } from '@/webidl/DOMString';

/**
 * Used in {@link TrustedTypePolicyOptions} to define a callback that creates
 * HTML.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#callbackdef-createhtmlcallback
 */
export type CreateHTMLCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => DOMString | null;

/**
 * Checks that an `unknown` value is a {@link CreateHTMLCallback}.
 *
 * Requirements:
 *   - `value` must be a function.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CreateHTMLCallback}.
 */
export const isCreateHTMLCallback = (value: unknown): value is CreateHTMLCallback =>
	typeof value === 'function';
