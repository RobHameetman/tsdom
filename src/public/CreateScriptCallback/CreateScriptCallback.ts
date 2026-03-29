import type { DOMString } from '@/webidl/DOMString';

/**
 * Used in {@link TrustedTypePolicyOptions} to define a callback that creates
 * a script URL.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#callbackdef-createscripturlcallback
 */
export type CreateScriptCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => DOMString | null;

/**
 * Checks that an `unknown` value is a {@link CreateScriptCallback}.
 *
 * Requirements:
 *   - `value` must be a function.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CreateScriptCallback}.
 */
export const isCreateScriptCallback = (value: unknown): value is CreateScriptCallback =>
	typeof value === 'function';
