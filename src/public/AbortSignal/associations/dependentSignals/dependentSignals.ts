import OrderedSet from '@/infra/OrderedSet';

/**
 * @see https://dom.spec.whatwg.org/#abortsignal-dependent-signals
 */
const dependentSignals = new WeakMap<AbortSignal, OrderedSet<WeakRef<AbortSignal>>>();

export const dependentSignalsOf = (signal: AbortSignal) => {
	return dependentSignals.get(signal);
};

export const disposeDependentSignalsOf = (signal: AbortSignal) => {
	dependentSignals.delete(signal);
};

export const initializeDependentSignalsOf = (signal: AbortSignal) => {
	if (!dependentSignals.has(signal)) {
		dependentSignals.set(signal, new OrderedSet<WeakRef<AbortSignal>>());
	}
};
