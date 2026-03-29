import { abortAlgorithmsOf } from '@/public/AbortSignal/associations/abortAlgorithms';
import fireAnEvent from '@/public/Event/algorithms/fireAnEvent';

/**
 * @see https://dom.spec.whatwg.org/#run-the-abort-steps
 */
export const runTheAbortSteps = (signal: AbortSignal) => {
	abortAlgorithmsOf(signal)?.forEach((algorithm) => {
		algorithm(signal.reason);
	});

	abortAlgorithmsOf(signal)?.empty();
	fireAnEvent('abort', signal);
};

export default runTheAbortSteps;
