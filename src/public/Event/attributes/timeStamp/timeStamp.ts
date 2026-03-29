/**
 * @see https://dom.spec.whatwg.org/#dom-event-timestamp
 */
export const timeStamp = new WeakMap<Event, DOMHighResTimeStamp>();

export const timeStampOf = (event: Event) => {
	return timeStamp.get(event) || 0;
};

export const initializeTimeStampOf = (event: Event, timeStampValue: DOMHighResTimeStamp) => {
	if (!timeStamp.has(event)) {
		timeStamp.set(event, timeStampValue);
	}
};
