import AbortError from '@/errors/AbortError';
import List from '@/infra/List';
import { setAbortReasonOf } from '@/public/AbortSignal/associations/abortReason';
import { dependentSignalsOf } from '@/public/AbortSignal/associations/dependentSignals';
import aborted from '@/public/AbortSignal/algorithms/aborted';
import runTheAbortSteps from '@/public/AbortSignal/algorithms/runTheAbortSteps';

/**
 * @see https://dom.spec.whatwg.org/#abortsignal-signal-abort
 */
export const signalAbort = (signal: AbortSignal, reason?: unknown) => {
	if (aborted(signal)) {
		return;
	}

	if (reason !== undefined) {
		setAbortReasonOf(signal, reason);
	} else {
		throw new AbortError(signal, 'abort', 'Could not abort signal without a reason.');
	}

	const dependentSignalsToAbort = new List<AbortSignal>();

	dependentSignalsOf(signal)?.map((ref) => ref.deref() as AbortSignal)?.forEach((dependentSignal) => {
		if (!aborted(dependentSignal)) {
			setAbortReasonOf(dependentSignal, reason);
			dependentSignalsToAbort.append(dependentSignal);
		}
	});

	runTheAbortSteps(signal);

	dependentSignalsToAbort.forEach((dependentSignal) => {
		runTheAbortSteps(dependentSignal);
	});
};

export default signalAbort;
