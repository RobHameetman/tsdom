/**
 * @see https://dom.spec.whatwg.org/#dom-customevent-detail
 */
const detail = new WeakMap<Event, unknown>();

export const detailOf = <T = unknown>(event: Event) => {
	return detail.get(event) as T | undefined;
};

export const setDetailOf = <T = unknown>(event: Event, value: T) => {
	detail.set(event, value);
};
