/**
 * @see https://dom.spec.whatwg.org/#concept-mo-callback
 */
const callback = new WeakMap<MutationObserver, MutationCallback>();

export const callbackOf = (observer: MutationObserver) => {
	return callback.get(observer);
};

export const disposeCallbackFor = (observer: MutationObserver) => {
	callback.delete(observer);
};

export const initializeCallbackFor = (observer: MutationObserver, cb: MutationCallback) => {
	if (!callback.has(observer)) {
		callback.set(observer, cb);
	}
};

export const invokeCallbackFor = (observer: MutationObserver, mutations: Parameters<MutationCallback>[0]) => {
	callback.get(observer)?.(mutations, observer);
};
