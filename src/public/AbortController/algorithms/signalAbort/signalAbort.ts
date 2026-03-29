import { signalOf } from '@/public/AbortController/associations/signal';
import signalAbortOn from '@/public/AbortSignal/algorithms/signalAbort';

/**
 * @see https://dom.spec.whatwg.org/#abortcontroller-signal-abort
 *
 * @param controller - The {@link AbortController} instance.
 * @param reason - [Optional] The reason for aborting.
 */
export const signalAbort = (controller: AbortController, reason?: unknown) =>
	signalAbortOn(signalOf(controller), reason);

export default signalAbort;
