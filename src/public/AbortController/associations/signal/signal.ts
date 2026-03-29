/**
 * @see https://dom.spec.whatwg.org/#concept-mo-callback
 */
const signal = new WeakMap<AbortController, AbortSignal>();

export const signalOf = (controller: AbortController) => {
	return signal.get(controller) as AbortSignal;
};

export const disposeSignalOf = (controller: AbortController) => {
	signal.delete(controller);
};

export const initializeSignalOf = (controller: AbortController, to: AbortSignal) => {
	if (!signal.has(controller)) {
		signal.set(controller, to);
	}
};
