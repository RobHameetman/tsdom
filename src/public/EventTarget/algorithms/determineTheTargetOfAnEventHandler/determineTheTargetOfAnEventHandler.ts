import WindowEventHandlers from '@/mixins/WindowEventHandlers';

/**
 * @see https://dom.spec.whatwg.org/#default-passive-value
 *
 * @param type - The event type.
 * @param eventTarget - The event target.
 *
 * @returns The default passive value.
 */
export const determineTheTargetOfAnEventHandler = (eventTarget: EventTarget, name: string) => {
	if (!((eventTarget instanceof HTMLBodyElement) || (eventTarget instanceof HTMLFrameSetElement))) {
		return eventTarget;
	}

	/**
	 * If name is not the name of an attribute member of the WindowEventHandlers
	 * interface mixin and the Window-reflecting body element event handler set
	 * does not contain name
	 */
	if (!(name in WindowEventHandlers)) {
		return eventTarget;
	}

	/**
	 * If eventTarget's node document is not an active document, then return null.
	 */
	if ((eventTarget as HTMLElement).ownerDocument) {
		return null;
	}

	/**
	 * Return eventTarget's node document's relevant global object.
	 */
	return (eventTarget as Node).ownerDocument?.defaultView as Window;
};

export default determineTheTargetOfAnEventHandler;
