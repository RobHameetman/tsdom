import isBoolean from '#_internals/utils/functions/isBoolean';

/**
 * @see https://dom.spec.whatwg.org/#concept-flatten-options
 *
 * @param options - The `options` parameter from `addEventListener` or
 * `removeEventListener`.
 *
 * @returns The `capture` boolean value.
 */
export const flattenOptions = (options = {} as EventListenerOptions | boolean) => {
	if (isBoolean(options)) {
		return options;
	}

	return options.capture;
};

export default flattenOptions;
