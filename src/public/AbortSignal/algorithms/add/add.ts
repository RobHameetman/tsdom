import aborted from '@/public/AbortSignal/algorithms/aborted';
import { type AbortAlgorithm, abortAlgorithmsOf } from '@/abort/AbortSignal/associations/abortAlgorithm';

/**
 * Add an algorithm to an {@link AbortSignal}.
 *
 * @see https://dom.spec.whatwg.org/#abortsignal-add
 */
export const add = (signal: AbortSignal, algorithm: AbortAlgorithm) => {
	if (aborted(signal)) {
		return;
	}

	abortAlgorithmsOf(signal)?.append(algorithm);
};

export default add;
