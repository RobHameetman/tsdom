/**
 * @see https://dom.spec.whatwg.org/#dom-event-bubbles
 */
export const bubbles = new WeakMap<Event, boolean>();

export const canBubble = (event: Event) => {
	return bubbles.get(event) || false;
};

export const setBubblabilityOf = (event: Event, value: boolean) => {
	bubbles.set(event, value);
};
