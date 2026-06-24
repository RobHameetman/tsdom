import { abortReasonOf } from '#public/AbortSignal/associations/abortReason';

/**
 * @see https://dom.spec.whatwg.org/#abortsignal-aborted
 */
export const aborted = (signal: AbortSignal) =>
	abortReasonOf(signal) !== undefined;

export default aborted;
