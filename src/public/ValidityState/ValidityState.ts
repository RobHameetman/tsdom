import { isType, isUndefined } from '@com.robhameetman/utils';

export const ValidityState = function(
	this: ValidityState,
) {
	return this;
};

ValidityState.prototype = Object.create(Object.prototype, {
	badInput: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	customError: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	patternMismatch: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	rangeOverflow: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	rangeUnderflow: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	stepMismatch: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	tooLong: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	tooShort: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	typeMismatch: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	valid: {
		get() {
			return true;
		},
		configurable: true,
		enumerable: true,
	},
	valueMissing: {
		get() {
			return false;
		},
		configurable: true,
		enumerable: true,
	},
	constructor: {
		value: ValidityState,
		writable: true,
		configurable: true,
	},
	[Symbol.toStringTag]: {
		value: 'ValidityState',
		configurable: true,
	},
});

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const isValidityState = (value: unknown): value is Element =>
	/**
	 * value
	 */
	(!isUndefined(window) && value instanceof Element) ||
	isType<ValidityState>('ValidityState', value);

export default ValidityState;
