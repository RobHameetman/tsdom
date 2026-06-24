import isObject from '#_internals/utils/functions/isObject';
import flattenOptions from '#public/EventTarget/algorithms/flattenOptions';

/**
 * @see https://dom.spec.whatwg.org/#event-flatten-more
 *
 * @param options
 */
export const flattenMoreOptions = (options = {} as AddEventListenerOptions | boolean) => {
	let capture = flattenOptions(options);

	let once = false;
	let passive = false;
	let signal = null;

	if (isObject(options)) {
		once = options.once === true;
		passive = options.passive === true;
		signal = options.signal as AbortSignal ?? null;
	}

	return {
		capture,
		once,
		passive,
		signal,
	} as const;
};

export default flattenMoreOptions;
