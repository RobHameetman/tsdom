import { type Listener, eventListenerListFor } from '#public/EventTarget/associations/eventListenerList';
import defaultPassiveValue from '#public/EventTarget/algorithms/defaultPassiveValue';
import removeAnEventListener from '#public/EventTarget/algorithms/removeAnEventListener';

/**
 * @see https://dom.spec.whatwg.org/#add-an-event-listener
 */
export const addAnEventListener = (
	eventTarget: EventTarget,
	listener: Listener,
) => {
	/**
	 * @TODO If eventTarget is a ServiceWorkerGlobalScope object, its service
	 * worker’s script resource’s has ever been evaluated flag is set, and
	 * listener’s type matches the type attribute value of any of the service
	 * worker events, then report a warning to the console that this might not
	 * give the expected results.
	 */

	if (listener.signal && listener.signal.aborted) {
		return;
	}

	if (!listener.callback) {
		return;
	}

	if (listener.passive === null) {
		listener.passive = defaultPassiveValue(listener.type, eventTarget);
	}

	const listenerList = eventListenerListFor(eventTarget);

	if (listenerList && !listenerList.contains(listener)) {
		listenerList.append(listener);
	}

	if (listener.signal !== null) {
		listener.signal.addEventListener('abort', () => {
			removeAnEventListener(eventTarget, listener);
		});
	}
};

export default addAnEventListener;
