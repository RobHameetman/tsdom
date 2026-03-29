/**
 * @see https://dom.spec.whatwg.org/#abortsignal-dependent
 */
const dependent = new WeakMap<AbortSignal, boolean>();

export const dependentOf = (signal: AbortSignal) => {
	return dependent.get(signal);
};

export const disposeDependentOf = (signal: AbortSignal) => {
	dependent.delete(signal);
};

export const initializeDependentOf = (signal: AbortSignal) => {
	if (!dependent.has(signal)) {
		dependent.set(signal, false);
	}
};

export const setDependentToTrueFor = (signal: AbortSignal) => {
	dependent.set(signal, true);
};

