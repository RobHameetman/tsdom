import { isFunction, isObject, isUndefined, noop } from '@com.robhameetman/utils';

export const WindowLocalStorage = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/localStorage
		 */
		localStorage: {
			get(this: WindowLocalStorage) {
				return {} as Storage;
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & WindowLocalStorage;

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
export const hasGlobalEventHandlers = (value: unknown): value is EventTarget =>
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

export default WindowLocalStorage;
