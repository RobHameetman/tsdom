import deactivateAnEventHandler from '@/public/EventTarget/algorithms/deactivateAnEventHandler';
import removeAllEventListeners from '@/public/EventTarget/algorithms/removeAllEventListeners';
import { eventHandlerMapOf } from '@/public/EventTarget/associations/eventHandlerMap';

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#erase-all-event-listeners-and-handlers
 */
export const eraseAllEventListenersAndHandlers = (eventTarget: EventTarget) => {
	const handlerMap = eventHandlerMapOf(eventTarget);

	Object.keys(handlerMap).forEach((name) => {
		deactivateAnEventHandler(eventTarget, name);
	});

	removeAllEventListeners(eventTarget);
};

export default eraseAllEventListenersAndHandlers;
