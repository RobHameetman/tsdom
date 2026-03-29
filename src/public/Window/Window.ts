import AnimationFrameProvider, { asAnimationFrameProvider } from '@/mixins/AnimationFrameProvider';
import WindowOrWorkerGlobalScope, { asWindowOrWorkerGlobalScope } from '@/mixins/WindowOrWorkerGlobalScope';
import GlobalEventHandlers, { asGlobalEventHandlers } from '@/mixins/GlobalEventHandlers';
import WindowEventHandlers, { asWindowEventHandlers } from '@/mixins/WindowEventHandlers';
import WindowProperties from '@/public/WindowProperties';
import WindowLocalStorage, { asWindowLocalStorage } from '@/mixins/WindowLocalStorage';
import WindowSessionStorage, { asWindowSessionStorage } from '@/mixins/WindowSessionStorage';
import { document } from '@/public/Window/associations/document';

const withMixins = (
	prototype: Window
) =>
	asAnimationFrameProvider(
		asGlobalEventHandlers(
			asWindowEventHandlers(
				asWindowLocalStorage(
					asWindowOrWorkerGlobalScope(
						asWindowSessionStorage(prototype),
					),
				),
			),
		),
	);

export const Window = function(this: Window) {
	throw new TypeError('Failed to construct \'Window\': Illegal constructor');

	WindowProperties.call(this);

	AnimationFrameProvider.call(this);
	GlobalEventHandlers.call(this);
	WindowEventHandlers.call(this);
	WindowLocalStorage.call(this);
	WindowOrWorkerGlobalScope.call(this);
	WindowSessionStorage.call(this);

	document.set(this, globalThis.document);

	return withMixins(
		Object.defineProperties(this, {
			clientInformation: {
				get(this: Window) {
					return this.navigator;
				},
				configurable: true,
				enumerable: true,
			},
			closed: {
				get(this: Window) {
					if (_state.has(this)) {
						const { opened } = _state.get(this) as WindowInstanceState;

						return !opened;
					}
					return false;
				},
				configurable: true,
				enumerable: true,
			},
			cookieStore: {
				get(this: Window) {
					return {} as CookieStore;
				},
				configurable: true,
				enumerable: true,
			},
			customElements: {
				get(this: Window) {
					return {} as CustomElementRegistry;
				},
				configurable: true,
				enumerable: true,
			},
			devicePixelRatio: {
				get(this: Window) {
					return 1;
				},
				configurable: true,
				enumerable: true,
			},
			document: {
				get(this: Window) {
					return document.get(this) || globalThis.document;
				},
				configurable: true,
				enumerable: true,
			},
			event: {
				get(this: Window) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			external: {
				get(this: Window) {
					return {} as External;
				},
				configurable: true,
				enumerable: true,
			},
			frameElement: {
				get(this: Window) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			frames: {
				get(this: Window) {
					return this;
				},
				configurable: true,
				enumerable: true,
			},
			history: {
				get(this: Window) {
					return {} as History;
				},
				configurable: true,
				enumerable: true,
			},
			innerHeight: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			innerWidth: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			length: {
				get(this: Window) {
					return this.frames.length;
				},
				configurable: true,
				enumerable: true,
			},
			location: {
				get(this: Window) {
					return {} as Location;
				},
				set(this: Window, _value: Location | string) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			locationbar: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			menubar: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			name: {
				get(this: Window) {
					return '';
				},
				set(this: Window, _value: string) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			navigator: {
				get(this: Window) {
					return {} as Navigator;
				},
				configurable: true,
				enumerable: true,
			},
			ondevicemotion: {
				get(this: Window) {
					return null;
				},
				set(this: Window, _value: EventListenerOrEventListenerObject | null) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			ondeviceorientation: {
				get(this: Window) {
					return null;
				},
				set(this: Window, _value: EventListenerOrEventListenerObject | null) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			ondeviceorientationabsolute: {
				get(this: Window) {
					return null;
				},
				set(this: Window, _value: EventListenerOrEventListenerObject | null) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			ondeviceorientationchange: {
				get(this: Window) {
					return null;
				},
				set(this: Window, _value: EventListenerOrEventListenerObject | null) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			opener: {
				get(this: Window) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			orientation: {
				get(this: Window) {
					return 0;
				},
				set(this: Window, _value: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			originAgentCluster: {
				get(this: Window) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},
			outerHeight: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			outerWidth: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			pageXOffset: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			pageYOffset: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			parent: {
				get(this: Window) {
					return this;
				},
				configurable: true,
				enumerable: true,
			},
			personalbar: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			screen: {
				get(this: Window) {
					return {} as Screen;
				},
				configurable: true,
				enumerable: true,
			},
			screenLeft: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			screenTop: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			screenX: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			screenY: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollX: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollY: {
				get(this: Window) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollbars: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			self: {
				get(this: Window) {
					return this;
				},
				configurable: true,
				enumerable: true,
			},
			speechSynthesis: {
				get(this: Window) {
					return {} as SpeechSynthesis;
				},
				configurable: true,
				enumerable: true,
			},
			status: {
				get(this: Window) {
					return '';
				},
				set(this: Window, _value: string) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
			},
			statusbar: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			toolbar: {
				get(this: Window) {
					return {} as BarProp;
				},
				configurable: true,
				enumerable: true,
			},
			top: {
				get(this: Window) {
					return this;
				},
				configurable: true,
				enumerable: true,
			},
			visualViewport: {
				get(this: Window) {
					return {} as VisualViewport;
				},
				configurable: true,
				enumerable: true,
			},
			window: {
				get(this: Window) {
					return this;
				},
				configurable: true,
				enumerable: true,
			},
			alert: {
				value(this: Window, _message?: string) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			blur: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			cancelIdleCallback: {
				value(this: Window, _handle: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			captureEvents: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			close: {
				value(this: Window) {
					if (_state.has(this)) {
						const state = _state.get(this) as WindowInstanceState;

						_state.set(this, {
							...state,
							opened: false,
						});
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			confirm: {
				value(this: Window, _message?: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			focus: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getComputedStyle: {
				value(this: Window, _elt: Element, _pseudoElt?: string | null) {
					return {} as CSSStyleDeclaration;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getSelection: {
				value(this: Window) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			matchMedia: {
				value(this: Window, _query: string) {
					return {} as MediaQueryList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			moveBy: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			moveTo: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			open: {
				value(
					this: Window,
					_url?: string,
					_target?: string,
					_features?: string,
					_replace?: boolean,
				) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			postMessage: {
				value(
					this: Window,
					_message: unknown,
					_targetOrigin: string,
					_transfer?: Transferable[],
				) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			print: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			prompt: {
				value(this: Window, _message?: string, _default?: string) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			releaseEvents: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			requestIdleCallback: {
				value(this: Window, _callback: IdleRequestCallback, _options?: IdleRequestOptions) {
					return 0;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			resizeBy: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			resizeTo: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scroll: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scrollBy: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scrollTo: {
				value(this: Window, _x: number, _y: number) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			stop: {
				value(this: Window) {
					// Ignore
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
		}),
	);
} as unknown as typeof global.Window;

Object.defineProperties(Window, {
	prototype: {
		value: Object.seal(Object.create(WindowProperties.prototype, {
			PERSISTENT: {
				value: 1,
				enumerable: true,
			},
			TEMPORARY: {
				value: 0,
				enumerable: true,
			},
			constructor: {
				value: Window,
				writable: true,
				configurable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Window',
				configurable: true,
			},
		})),
	},
});

Object.seal(Window);

if (!globalThis.Window) {
	globalThis.Window = Window;
}

if (!globalThis.window) {
	const _window = Object.create(Window.prototype);

	const $window = new Proxy(global, {
		get(target, prop, receiver) {
			// First check window-specific properties
			if (prop in _window) {
				return _window[prop as keyof Window];
			}

			// Then check global properties
			return Reflect.get(target, prop, receiver);
		},
		set(target, prop, value, receiver) {
			// Handle window property sets
			if (prop in _window) {
				_window[prop as keyof Window] = value;

				return true;
			}

			// Fall back to global
			return Reflect.set(target, prop, value, receiver);
		},
		has(target, prop) {
			return prop in _window || Reflect.has(target, prop);
		}
	}) as Window & typeof globalThis;

	Window.call($window);

	globalThis.window = $window;
	globalThis.self = $window;
}

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const isWindow = (value: unknown): value is Window =>
	typeof globalThis.Window !== 'undefined' &&
	value instanceof globalThis.Window;

export default Window;
