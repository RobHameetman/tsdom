import type { Listener } from '@/public/EventTarget/associations/eventListenerList';
/**
 * Each {@link EventTarget} object can have an associated activation behavior
 * algorithm. {@link Node}s, This exists because user agents perform certain
 * actions for certain {@link EventTarget} objects, e.g., the
 * {@link HTMLAreaElement}, in response to synthetic {@link MouseEvent} events
 * whose `type` attribute is `click`. Web compatibility prevented it from being
 * removed and it is now the enshrined way of defining an activation of something.
 *
 * @see https://dom.spec.whatwg.org/#eventtarget-activation-behavior
 *
 * @param event - An event being dispatched.
 */
// export type EventHandler = (this: EventHandlers, ev: Event) => void;

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-map
 */
export type EventHandlerMap<T> = Record<string, EventHandler<T>>;

/**
 * An internal raw uncompiled handler is a tuple with the following information:
 * - An uncompiled script body
 * - A location where the script body originated, in case an error needs to be
 * reported
 *
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#internal-raw-uncompiled-handler
 */
export type InternalRawUncompiledHandler = [string, string];

/**
 * @TODO - Move this and the type definition somewhere else probably
 *
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#internal-raw-uncompiled-handler
 *
 * @param value
 */
export const isInternalRawUncompiledHandler = <T>(value: EventHandler<T>['value']) => {
	return Array.isArray(value) &&
		value.length === 2 &&
		value.every((item) => typeof item === 'string');
};

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers
 */
export interface EventHandler<T> {
	/**
	 * a value, which is either null, a callback object, or an internal raw
	 * uncompiled handler. The EventHandler callback function type describes how
	 * this is exposed to scripts. Initially, an event handler's value must be set
	 * to null.
	 */
	value: ((this: T, ev: Event) => unknown) | InternalRawUncompiledHandler | null;
	listener: Listener | null;
}

const eventHandlerMap = new WeakMap<EventTarget, EventHandlerMap<unknown>>();

export const eventHandlerMapOf = <T>(eventTarget: EventTarget) => {
	return eventHandlerMap.get(eventTarget) || new Proxy({}, {
		get() {
			return {
				value: null,
				listener: null,
			};
		},
	}) as EventHandlerMap<T>;
};

export const initializeEventHandlerMapFor = <T>(eventTarget: EventTarget, map: EventHandlerMap<T>) => {
	eventHandlerMap.set(eventTarget, {});
};

export const setEventHandlerMapFor = <T>(eventTarget: EventTarget, map: EventHandlerMap<T>) => {
	eventHandlerMap.set(eventTarget, map as EventHandlerMap<unknown>);
};
