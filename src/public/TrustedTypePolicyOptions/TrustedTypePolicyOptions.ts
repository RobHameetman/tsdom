import isObject from '#_internals/utils/functions/isObject';
import { type CreateHTMLCallback, isCreateHTMLCallback } from '#security/CreateHTMLCallback';
import { type CreateScriptCallback, isCreateScriptCallback } from '#security/CreateScriptCallback';
import { type CreateScriptURLCallback, isCreateScriptURLCallback } from '#security/CreateScriptURLCallback';

/**
 * Holds author-defined functions for converting string values into trusted
 * values. These functions do not create {@link TrustedType} object instances
 * directly - this behavior is provided by {@link TrustedTypePolicy}.
 *
 * @see https://w3c.github.io/trusted-types/dist/spec/#dictdef-trustedtypepolicyoptions
 */
export interface TrustedTypePolicyOptions {
	readonly createHTML?: CreateHTMLCallback;
	readonly createScript?: CreateScriptCallback;
	readonly createScriptURL?: CreateScriptURLCallback;
}

/**
 * Checks that an `unknown` value is {@link TrustedTypePolicyOptions}.
 *
 * Requirements:
 *   - `value` must be an object.
 *   - `value.createHTML()` is optional and must be a {@link CreateHTMLCallback} if provided.
 *	 - `value.createScript()` is optional and must be a {@link CreateScriptCallback} if provided.
 *	 - `value.createScriptURL()` is optional and must be a {@link CreateScriptURLCallback} if provided.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link TrustedTypePolicyOptions}.
 */
export const areTrustedTypePolicyOptions = (value: unknown): value is TrustedTypePolicyOptions =>
	isObject(value) &&
	('createHTML' in value ? isCreateHTMLCallback(value.createHTML) : true) &&
	('createScript' in value ? isCreateScriptCallback(value.createScript) : true) &&
	('createScriptURL' in value ? isCreateScriptURLCallback(value.createScriptURL) : true);
