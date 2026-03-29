import { type EventHandler, eventHandlerMapOf, isInternalRawUncompiledHandler } from '@/public/EventTarget/associations/eventHandlerMap';

/**
 * @see https://dom.spec.whatwg.org/#default-passive-value
 *
 * @param type - The event type.
 * @param eventTarget - The event target.
 *
 * @returns The default passive value.
 */
export const getTheCurrentValueOfTheEventHandler = (eventTarget: EventTarget, name: string) => {
	const handlerMap = eventHandlerMapOf(eventTarget);
	const eventHandler = handlerMap[name];

	if (isInternalRawUncompiledHandler(eventHandler?.value || null)) {
		/**
		 * @TODO Come back to this later, it's a whole thing
		 */
	}

	return eventHandler?.value || null;
};

export default getTheCurrentValueOfTheEventHandler;
