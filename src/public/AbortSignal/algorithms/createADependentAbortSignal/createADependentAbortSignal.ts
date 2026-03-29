import OrderedSet from '@/infra/OrderedSet';
import { abortReasonOf, setAbortReasonOf } from '@/public/AbortSignal/associations/abortReason';
import { dependentSignalsOf } from '@/public/AbortSignal/associations/dependentSignals';
import { sourceSignalsOf } from '@/public/AbortSignal/associations/sourceSignals';
import { dependentOf, setDependentToTrueFor } from '@/public/AbortSignal/associations/dependent';
import aborted from '@/public/AbortSignal/algorithms/aborted';

/**
 * @see https://dom.spec.whatwg.org/#create-a-dependent-abort-signal
 */
export const createADependentAbortSignal = <S extends typeof global.AbortSignal = typeof global.AbortSignal>(
	signals: ReadonlyArray<AbortSignal>,
	signalInterface: S,
	realm: unknown = globalThis,
) => {
	const resultSignal = (realm as typeof global).Object.create(signalInterface.prototype) as InstanceType<S>;

	for (const signal of signals) {
		if (aborted(signal)) {
			setAbortReasonOf(resultSignal, abortReasonOf(signal));

			return resultSignal;
		}
	}

	signals.forEach((signal) => {
		if (aborted(signal)) {
			setAbortReasonOf(resultSignal, abortReasonOf(signal));

			return resultSignal;
		}
	});

	setDependentToTrueFor(resultSignal);

	signals.forEach((signal) => {
		if (!dependentOf(signal)) {
			sourceSignalsOf(resultSignal)?.append(new WeakRef(signal));
			dependentSignalsOf(signal)?.append(new WeakRef(resultSignal));
		} else {
			for (const sourceSignal of (sourceSignalsOf(resultSignal) || new OrderedSet())) {
				sourceSignalsOf(resultSignal)?.append(sourceSignal);
				dependentSignalsOf(sourceSignal.deref() as AbortSignal)?.append(new WeakRef(resultSignal));
			}
		}
	});

	return resultSignal;
};

export default createADependentAbortSignal;
