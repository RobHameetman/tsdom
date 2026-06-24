import isFunction from '#_internals/utils/functions/isFunction';
import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import noop from '#_internals/utils/functions/noop';

const _listeners = new Map<string, EventListenerOrEventListenerObject | null>();

export const WindowEventHandlers = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/afterprint_event
		 */
		onafterprint: {
			get(this: WindowEventHandlers) {
				return _listeners.get('afterprint') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('afterprint', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/beforeprint_event
		 */
		onbeforeprint: {
			get(this: WindowEventHandlers) {
				return _listeners.get('beforeprint') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('beforeprint', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/beforeunload_event
		 */
		onbeforeunload: {
			get(this: WindowEventHandlers) {
				return _listeners.get('beforeunload') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('beforeunload', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/gamepadconnected_event
		 */
		ongamepadconnected: {
			get(this: WindowEventHandlers) {
				return _listeners.get('gamepadconnected') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('gamepadconnected', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/gamepaddisconnected_event
		 */
		ongamepaddisconnected: {
			get(this: WindowEventHandlers) {
				return _listeners.get('gamepaddisconnected') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('gamepaddisconnected', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/hashchange_event
		 */
		onhashchange: {
			get(this: WindowEventHandlers) {
				return _listeners.get('hashchange') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('hashchange', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/languagechange_event
		 */
		onlanguagechange: {
			get(this: WindowEventHandlers) {
				return _listeners.get('languagechange') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('languagechange', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/message_event
		 */
		onmessage: {
			get(this: WindowEventHandlers) {
				return _listeners.get('message') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('message', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/messageerror_event
		 */
		onmessageerror: {
			get(this: WindowEventHandlers) {
				return _listeners.get('messageerror') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('messageerror', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/offline_event
		 */
		onoffline: {
			get(this: WindowEventHandlers) {
				return _listeners.get('offline') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('offline', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/online_event
		 */
		ononline: {
			get(this: WindowEventHandlers) {
				return _listeners.get('online') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('online', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/pagehide_event
		 */
		onpagehide: {
			get(this: WindowEventHandlers) {
				return _listeners.get('pagehide') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('pagehide', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/pagereveal_event
		 */
		onpagereveal: {
			get(this: WindowEventHandlers) {
				return _listeners.get('pagereveal') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('pagereveal', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/pageshow_event
		 */
		onpageshow: {
			get(this: WindowEventHandlers) {
				return _listeners.get('pageshow') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('pageshow', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/pageswap_event
		 */
		onpageswap: {
			get(this: WindowEventHandlers) {
				return _listeners.get('pageswap') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('pageswap', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/popstate_event
		 */
		onpopstate: {
			get(this: WindowEventHandlers) {
				return _listeners.get('popstate') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('popstate', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/rejectionhandled_event
		 */
		onrejectionhandled: {
			get(this: WindowEventHandlers) {
				return _listeners.get('rejectionhandled') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('rejectionhandled', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/storage_event
		 */
		onstorage: {
			get(this: WindowEventHandlers) {
				return _listeners.get('storage') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('storage', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/unhandledrejection_event
		 */
		onunhandledrejection: {
			get(this: WindowEventHandlers) {
				return _listeners.get('unhandledrejection') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('unhandledrejection', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/unload_event
		 */
		onunload: {
			get(this: WindowEventHandlers) {
				return _listeners.get('unload') || null;
			},
			set(this: WindowEventHandlers, value: EventListenerOrEventListenerObject | null) {
				_listeners.set('unload', value);
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & WindowEventHandlers;

/**
 * Checks that an `unknown` value is an {@link EventTarget} node.
 *
 * Requirements:
 *   - `value` must be an instance of `EventTarget` if `window` is defined or an object if `window` is `undefined`.
 *   - `value.addEventListener()` must be a function if `window` is `undefined`.
 *   - `value.dispatchEvent()` must be a function if `window` is `undefined`.
 *   - `value.removeEventListener()` must be a function if `window` is `undefined`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link EventTarget} node.
 */
export const hasWindowEventHandlers = <T>(
	value: unknown,
): value is T & WindowEventHandlers =>
	/**
	 * value
	 */
	!isUndefined(window)
		? value instanceof EventTarget
		: isObject(value) &&
		  /**
		   * value.addEventListener()
		   */
		  'addEventListener' in value &&
		  isFunction(value.addEventListener) &&
		  /**
		   * value.dispatchEvent()
		   */
		  'dispatchEvent' in value &&
		  isFunction(value.dispatchEvent) &&
		  /**
		   * value.removeEventListener()
		   */
		  'removeEventListener' in value &&
		  isFunction(value.removeEventListener);

export default WindowEventHandlers;
