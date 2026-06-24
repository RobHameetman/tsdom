import isString from '#_internals/utils/functions/isString';

/**
 * A list of all possible {@link LegacyErrorConstant} values.
 */
export enum LegacyErrorConstant {
	IndexSizeError = 'INDEX_SIZE_ERR',
	DOMStringSizeError = 'DOMSTRING_SIZE_ERR',
	HierarchyRequestError = 'HIERARCHY_REQUEST_ERR',
	WrongDocumentError = 'WRONG_DOCUMENT_ERR',
	InvalidCharacterError = 'INVALID_CHARACTER_ERR',
	NoDataAllowedError = 'NO_DATA_ALLOWED_ERR',
	NoModificationAllowedError = 'NO_MODIFICATION_ALLOWED_ERR',
	NotFoundError = 'NOT_FOUND_ERR',
	NotSupportedError = 'NOT_SUPPORTED_ERR',
	InUseAttributeError = 'INUSE_ATTRIBUTE_ERR',
	InvalidStateError = 'INVALID_STATE_ERR',
	SyntaxError = 'SYNTAX_ERR',
	InvalidModificationError = 'INVALID_MODIFICATION_ERR',
	NamespaceError = 'NAMESPACE_ERR',
	InvalidAccessError = 'INVALID_ACCESS_ERR',
	ValidationError = 'VALIDATION_ERR',
	TypeMismatchError = 'TYPE_MISMATCH_ERR',
	SecurityError = 'SECURITY_ERR',
	NetworkError = 'NETWORK_ERR',
	AbortError = 'ABORT_ERR',
	URLMismatchError = 'URL_MISMATCH_ERR',
	QuotaExceededError = 'QUOTA_EXCEEDED_ERR',
	TimeoutError = 'TIMEOUT_ERR',
	InvalidNodeTypeError = 'INVALID_NODE_TYPE_ERR',
	DataCloneError = 'DATA_CLONE_ERR',
}

export type LegacyErrorName = keyof typeof LegacyErrorConstant;

/**
 * A list of all {@link LegacyErrorConstant} values.
 */
export const LEGACY_ERROR_CODES = Object.freeze(
	Object.values(LegacyErrorConstant).filter(isString),
);

/**
 * Checks that an `unknown` value is a {@link LegacyErrorConstant}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a string key
 *     of {@link LegacyErrorConstant}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link LegacyErrorConstant}.
 */
export const isLegacyErrorConstant = (value: unknown): value is LegacyErrorConstant =>
	/**
	 * value
	 */
	LEGACY_ERROR_CODES.includes(value as LegacyErrorConstant);

export default LegacyErrorConstant;
