import { type Listener, eventListenerListFor } from '@/public/EventTarget/associations/eventListenerList';

/**
 * @see https://dom.spec.whatwg.org/#remove-an-event-listener
 */
export const removeAnEventListener = (
	eventTarget: EventTarget,
	listener: Listener,
) => {
	/**
	 * @TODO If eventTarget is a ServiceWorkerGlobalScope object and its service
	 * worker’s set of event types to handle contains listener’s type, then report
	 * a warning to the console that this might not give the expected results.
	 */

	listener.removed = true;
	eventListenerListFor(eventTarget).remove((current) => current === listener);
};

export default removeAnEventListener;
