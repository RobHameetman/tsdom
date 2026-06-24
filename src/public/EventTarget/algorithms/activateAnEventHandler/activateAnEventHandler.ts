import addAnEventListener from '#public/EventTarget/algorithms/addAnEventListener';
import { eventHandlerMapOf } from '#public/EventTarget/associations/eventHandlerMap';
import type { Listener } from '#public/EventTarget/associations/eventListenerList';

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#activate-an-event-handler
 */
export const activateAnEventHandler = (eventTarget: EventTarget, name: string) => {
	const handlerMap = eventHandlerMapOf(eventTarget);
	const eventHandler = handlerMap[name];

	if (eventHandler.listener !== null) {
		return;
	}

	/**
	 * Let callback be the result of creating a Web IDL EventListener instance
	 * representing a reference to a function of one argument that executes the
	 * steps of the event handler processing algorithm, given eventTarget, name,
	 * and its argument.
	 */
	const callback = null;

	/**
	 * Let listener be a new event listener whose type is the event handler event
	 * type corresponding to eventHandler and callback is callback.
	 */
	const listener = {
		type: name,
		callback,
		capture: false,
		passive: null,
		once: false,
		signal: null,
		removed: false,
	} as Listener;

	addAnEventListener(eventTarget, listener);
	eventHandler.listener = listener;
};

export default activateAnEventHandler;
