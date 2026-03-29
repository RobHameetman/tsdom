/**
 * @see https://dom.spec.whatwg.org/#abortsignal-abort-reason
 */
const abortReason = new WeakMap<AbortSignal, unknown>();

export const abortReasonOf = (signal: AbortSignal) => {
	return abortReason.get(signal);
};

export const disposeAbortReasonOf = (signal: AbortSignal) => {
	abortReason.delete(signal);
};

export const initializeAbortReasonOf = (signal: AbortSignal) => {
	if (!abortReason.has(signal)) {
		abortReason.set(signal, undefined);
	}
};

export const setAbortReasonOf = (signal: AbortSignal, reason: unknown) => {
	abortReason.set(signal, reason);
};
