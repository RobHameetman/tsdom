import OrderedSet from '#infra/OrderedSet';

/**
 * @see https://dom.spec.whatwg.org/#abortsignal-source-signals
 */
const sourceSignals = new WeakMap<AbortSignal, OrderedSet<WeakRef<AbortSignal>>>();

export const sourceSignalsOf = (signal: AbortSignal) => {
	return sourceSignals.get(signal);
};

export const disposeSourceSignalsOf = (signal: AbortSignal) => {
	sourceSignals.delete(signal);
};

export const initializeSourceSignalsOf = (signal: AbortSignal) => {
	if (!sourceSignals.has(signal)) {
		sourceSignals.set(signal, new OrderedSet<WeakRef<AbortSignal>>());
	}
};
