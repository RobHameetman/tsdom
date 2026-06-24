import List from '#infra/List';

/**
 * An event listener can be used to observe a specific event.
 * @see https://dom.spec.whatwg.org/#concept-event-listener
 */
export interface Listener {
	type: string;
	callback: EventListenerObject | null;
	capture: boolean;
	passive: boolean | null;
	once: boolean;
	signal: AbortSignal | null;
	removed: boolean;
}

/**
 * @see https://dom.spec.whatwg.org/#eventtarget-event-listener-list
 */
const eventListenerList = new WeakMap<EventTarget, List<Listener>>();

export const eventListenerListFor = (eventTarget: EventTarget) => {
	return eventListenerList.get(eventTarget) as List<Listener> || new List<Listener>();
};

export const setEventListenersToEmptyListFor = (eventTarget: EventTarget) => {
	if (!eventListenerList.has(eventTarget)) {
		eventListenerList.set(eventTarget, new List<Listener>());
	} else {
		(eventListenerList.get(eventTarget) as List<Listener>).empty();
	}
};
