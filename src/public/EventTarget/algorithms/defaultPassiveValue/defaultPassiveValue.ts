/**
 * @see https://dom.spec.whatwg.org/#default-passive-value
 *
 * @param type - The event type.
 * @param eventTarget - The event target.
 *
 * @returns The default passive value.
 */
export const defaultPassiveValue = (type: string, eventTarget: EventTarget) => {
	const passiveEvents = new Set([
		'touchstart',
		'touchmove',
		'wheel',
		'mousewheel',
	]);

	const isPassiveEvent = passiveEvents.has(type);

	/**
	 * Return true if eventTarget is a Window object,
	 * or is a node whose node document is eventTarget,
	 * or is a node whose node document’s document element is eventTarget,
	 * or is a node whose node document’s body element is eventTarget.
	 */
	const isPassiveTarget =
		eventTarget instanceof Window ||
		(eventTarget instanceof Node && (
			eventTarget.isSameNode(eventTarget.ownerDocument) ||
			eventTarget.isSameNode(eventTarget.ownerDocument?.documentElement || null) ||
			eventTarget.isSameNode(eventTarget.ownerDocument?.body || null)
		));

	if (isPassiveEvent && isPassiveTarget) {
		return true;
	}

	return false;
};

export default defaultPassiveValue;
