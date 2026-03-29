import LegacyErrorConstant, { type LegacyErrorName } from '@/enums/LegacyErrorConstant';

interface DOMExceptionState {
	readonly message: string;
	readonly name: string;
}

const LEGACY_ERROR_CODES = {
	[LegacyErrorConstant.IndexSizeError]: {
		value: 1,
		enumerable: true,
	},
	[LegacyErrorConstant.DOMStringSizeError]: {
		value: 2,
		enumerable: true,
	},
	[LegacyErrorConstant.HierarchyRequestError]: {
		value: 3,
		enumerable: true,
	},
	[LegacyErrorConstant.WrongDocumentError]: {
		value: 4,
		enumerable: true,
	},
	[LegacyErrorConstant.InvalidCharacterError]: {
		value: 5,
		enumerable: true,
	},
	[LegacyErrorConstant.NoDataAllowedError]: {
		value: 6,
		enumerable: true,
	},
	[LegacyErrorConstant.NoModificationAllowedError]: {
		value: 7,
		enumerable: true,
	},
	[LegacyErrorConstant.NotFoundError]: {
		value: 8,
		enumerable: true,
	},
	[LegacyErrorConstant.NotSupportedError]: {
		value: 9,
		enumerable: true,
	},
	[LegacyErrorConstant.InUseAttributeError]: {
		value: 10,
		enumerable: true,
	},
	[LegacyErrorConstant.InvalidStateError]: {
		value: 11,
		enumerable: true,
	},
	[LegacyErrorConstant.SyntaxError]: {
		value: 12,
		enumerable: true,
	},
	[LegacyErrorConstant.InvalidModificationError]: {
		value: 13,
		enumerable: true,
	},
	[LegacyErrorConstant.NamespaceError]: {
		value: 14,
		enumerable: true,
	},
	[LegacyErrorConstant.InvalidAccessError]: {
		value: 15,
		enumerable: true,
	},
	[LegacyErrorConstant.ValidationError]: {
		value: 16,
		enumerable: true,
	},
	[LegacyErrorConstant.TypeMismatchError]: {
		value: 17,
		enumerable: true,
	},
	[LegacyErrorConstant.SecurityError]: {
		value: 18,
		enumerable: true,
	},
	[LegacyErrorConstant.NetworkError]: {
		value: 19,
		enumerable: true,
	},
	[LegacyErrorConstant.AbortError]: {
		value: 20,
		enumerable: true,
	},
	[LegacyErrorConstant.URLMismatchError]: {
		value: 21,
		enumerable: true,
	},
	[LegacyErrorConstant.QuotaExceededError]: {
		value: 22,
		enumerable: true,
	},
	[LegacyErrorConstant.TimeoutError]: {
		value: 23,
		enumerable: true,
	},
	[LegacyErrorConstant.InvalidNodeTypeError]: {
		value: 24,
		enumerable: true,
	},
	[LegacyErrorConstant.DataCloneError]: {
		value: 25,
		enumerable: true,
	},
} as PropertyDescriptorMap;

const _state = new WeakMap<DOMException, DOMExceptionState>();

export const DOMException = function(
	this: DOMException,
	message = '',
	name = 'DOMException',
) {
	_state.set(this, { message, name });

	return this;
} as unknown as typeof global.DOMException;

DOMException.prototype = Object.create(Error.prototype, {
	code: {
		get() {
			const { name } = _state.get(this) as DOMExceptionState;

			return DOMException[LegacyErrorConstant[name as LegacyErrorName]] || 0;
		},
		configurable: true,
		enumerable: true,
	},
	message: {
		get() {
			const { message } = _state.get(this) as DOMExceptionState;

			return message;
		},
		configurable: true,
		enumerable: true,
	},
	name: {
		get() {
			const { name } = _state.get(this) as DOMExceptionState;

			return name;
		},
		configurable: true,
		enumerable: true,
	},
	...LEGACY_ERROR_CODES,
	constructor: {
		value: DOMException,
		configurable: true,
		enumerable: false,
		writable: true,
	},
	[Symbol.toStringTag]: {
		value: 'DOMException',
		configurable: true,
	},
});

Object.defineProperties(DOMException, LEGACY_ERROR_CODES);

if (!globalThis.DOMException) {
	globalThis.DOMException = DOMException;
}

export default DOMException;
