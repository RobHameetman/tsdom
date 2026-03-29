import removeAnEventListener from '@/public/EventTarget/algorithms/removeAnEventListener';
import { eventHandlerMapOf } from '@/public/EventTarget/associations/eventHandlerMap';

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#deactivate-an-event-handler
 */
export const deactivateAnEventHandler = (eventTarget: EventTarget, name: string) => {
	const handlerMap = eventHandlerMapOf(eventTarget);
	const eventHandler = handlerMap[name];

	eventHandler.value = null;

	const { listener } = eventHandler;

	if (listener !== null) {
		removeAnEventListener(eventTarget, listener);
	}

	eventHandler.listener = null;
};

export default deactivateAnEventHandler;
