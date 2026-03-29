import OrderedSet from '@/infra/OrderedSet';

export type AbortAlgorithm = (reason: unknown) => void;

/**
 * @see https://dom.spec.whatwg.org/#abortsignal-abort-algorithms
 */
const abortAlgorithms = new WeakMap<AbortSignal, OrderedSet<AbortAlgorithm>>();

export const abortAlgorithmsOf = (signal: AbortSignal) => {
	return abortAlgorithms.get(signal);
};

export const disposeAbortAlgorithmsOf = (signal: AbortSignal) => {
	abortAlgorithms.delete(signal);
};

export const initializeAbortAlgorithmsOf = (signal: AbortSignal) => {
	if (!abortAlgorithms.has(signal)) {
		abortAlgorithms.set(signal, new OrderedSet<AbortAlgorithm>());
	}
};

export const addAbortAlgorithmOf = (signal: AbortSignal, algorithm: AbortAlgorithm) => {
	abortAlgorithmsOf(signal)?.append(algorithm);
};

export const invokeAbortAlgorithmsOf = (signal: AbortSignal, reason: unknown) => {
	abortAlgorithmsOf(signal)?.forEach((algorithm) => algorithm(reason));
};
