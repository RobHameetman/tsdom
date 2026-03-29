/**
 * @see https://dom.spec.whatwg.org/#dom-event-cancelable
 */
export const cancelable = new WeakMap<Event, boolean>();

export const isCancelable = (event: Event) => {
	return cancelable.get(event) || false;
};

export const setCancelabilityOf = (event: Event, value: boolean) => {
	cancelable.set(event, value);
};
