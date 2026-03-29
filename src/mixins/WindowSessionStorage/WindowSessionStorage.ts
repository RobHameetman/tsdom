import { isFunction, isObject, isUndefined } from '@com.robhameetman/utils';

export const WindowSessionStorage = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Window/sessionStorage
		 */
		sessionStorage: {
			get(this: WindowSessionStorage) {
				return {} as Storage;
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & WindowSessionStorage;

/**
 * Checks that an `unknown` value is an {@link WindowSessionStorage} node.
 *
 * Requirements:
 *   - `value` must be an instance of `WindowSessionStorage` if `window` is defined or an object if `window` is `undefined`.
 *   - `value.addEventListener()` must be a function if `window` is `undefined`.
 *   - `value.dispatchEvent()` must be a function if `window` is `undefined`.
 *   - `value.removeEventListener()` must be a function if `window` is `undefined`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link WindowSessionStorage} node.
 */
export const hasWindowSessionStorage = (value: unknown): value is WindowSessionStorage =>
	/**
	 * value
	 */
	!isUndefined(window)
		? value instanceof WindowSessionStorage
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

export default WindowSessionStorage;
