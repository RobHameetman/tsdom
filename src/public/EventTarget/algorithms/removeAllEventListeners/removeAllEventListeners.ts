import { type Listener, eventListenerListFor } from '#public/EventTarget/associations/eventListenerList';
import removeAnEventListener from '#public/EventTarget/algorithms/removeAnEventListener';

/**
 * @see https://dom.spec.whatwg.org/#remove-all-event-listeners
 */
export const removeAllEventListeners = (
	eventTarget: EventTarget,
) => {
	eventListenerListFor(eventTarget).forEach((listener) => {
		removeAnEventListener(eventTarget, listener);
	});
};

export default removeAllEventListeners;
