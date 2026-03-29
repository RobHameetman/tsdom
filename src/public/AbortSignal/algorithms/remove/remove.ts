import aborted from '@/public/AbortSignal/algorithms/aborted';
import { type AbortAlgorithm, abortAlgorithmsOf } from '@/abort/AbortSignal/associations/abortAlgorithm';

/**
 * Remove an algorithm from an {@link AbortSignal}.
 *
 * @see https://dom.spec.whatwg.org/#abortsignal-remove
 */
export const remove = (signal: AbortSignal, algorithm: AbortAlgorithm) => {
	if (aborted(signal)) {
		return;
	}

	abortAlgorithmsOf(signal)?.remove((item) => item === algorithm);
};

export default remove;
