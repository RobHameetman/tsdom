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
 * Checks that an `unknown` value is an {@link ValidityState}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link ValidityState}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link ValidityState}.
 */
export const isValidityState = (value: unknown): value is ValidityState =>
	typeof globalThis.ValidityState !== 'undefined' &&
	value instanceof globalThis.ValidityState;

export default ValidityState;
