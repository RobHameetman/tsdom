import type { DOMString } from '@/webidl/DOMString';

/**
 * Used in {@link TrustedTypePolicyOptions} to define a callback that creates
 * a script URL.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#callbackdef-createscripturlcallback
 */
export type CreateScriptURLCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => DOMString | null;

/**
 * Checks that an `unknown` value is a {@link CreateScriptURLCallback}.
 *
 * Requirements:
 *   - `value` must be a function.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CreateScriptURLCallback}.
 */
export const isCreateScriptURLCallback = (value: unknown): value is CreateScriptURLCallback =>
	typeof value === 'function';
