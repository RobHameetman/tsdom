import isFunction from '#_internals/utils/functions/isFunction';
import noop from '#_internals/utils/functions/noop';
import { InvalidStateError } from '#errors/InvalidStateError';
import { EventFlag, isFlagSetFor, isFlagUnsetFor } from '#public/Event/associations/flags';
import { type Listener, eventListenerListFor } from '#public/EventTarget/associations/eventListenerList';
import dispatch from '#public/EventTarget/algorithms/dispatch';
import addAnEventListener from '#public/EventTarget/algorithms/addAnEventListener';
import removeAnEventListener from '#public/EventTarget/algorithms/removeAnEventListener';
import eraseAllEventListenersAndHandlers from '#public/EventTarget/algorithms/eraseAllEventListenersAndHandlers';
import { setIsTrustedToFalseFor } from '#public/Event/attributes/isTrusted';
import flattenOptions from '#public/EventTarget/algorithms/flattenOptions';
import flattenMoreOptions from '#public/EventTarget/algorithms/flattenMoreOptions';

/**
 * @see https://dom.spec.whatwg.org/#potential-event-target
 */
export type PotentialEventTarget = EventTarget | null;

export const EventTarget = function(this: EventTarget) {
	throw new TypeError('Failed to construct \'EventTarget\': Illegal constructor');
} as unknown as typeof global.EventTarget;

// export const EventTarget = implOf<typeof global.EventTarget>(
// 	function EventTarget(this: EventTarget) {
// 		return this;
// 	}, {
// 		onInit: (instance) => {},
// 		subtypes: [
// 			globalThis.AbortSignal,
// 			// Animation,
// 			// AudioDecoder,
// 			// AudioEncoder,
// 			// AudioNode,
// 			// BaseAudioContext,
// 			// BroadcastChannel,
// 			// Clipboard,
// 			// CookieStore,
// 			// EventSource,
// 			// FileReader,
// 			// FontFaceSet,
// 			// IDBDatabase,
// 			// IDBRequest,
// 			// IDBTransaction,
// 			// MIDIAccess,
// 			// MIDIPort,
// 			// MediaDevices,
// 			// MediaKeySession,
// 			// MediaQueryList,
// 			// MediaRecorder,
// 			// MediaSource,
// 			// MediaStream,
// 			// MediaStreamTrack,
// 			// MessagePort,
// 			// NavigationHistoryEntry,
// 			globalThis.Node,
// 			// Notification,
// 			// OffscreenCanvas,
// 			// PaymentRequest,
// 			// PaymentResponse,
// 			// Performance,
// 			// PermissionStatus,
// 			// PictureInPictureWindow,
// 			// RTCDTMFSender,
// 			// RTCDataChannel,
// 			// RTCDtlsTransport,
// 			// RTCIceTransport,
// 			// RTCPeerConnection,
// 			// RTCSctpTransport,
// 			// RemotePlayback,
// 			// ScreenOrientation,
// 			// ServiceWorker,
// 			// ServiceWorkerContainer,
// 			// ServiceWorkerRegistration,
// 			// SharedWorker,
// 			// SourceBuffer,
// 			// SourceBufferList,
// 			// SpeechSynthesis,
// 			// SpeechSynthesisUtterance,
// 			// TextTrack,
// 			// TextTrackCue,
// 			// TextTrackList,
// 			// VideoDecoder,
// 			// VideoEncoder,
// 			// VisualViewport,
// 			// WakeLockSentinel,
// 			// WebSocket,
// 			globalThis.Window,
// 			// Worker,
// 			// XMLHttpRequestEventTarget,
// 		],
// 	},
// );

Object.defineProperties(EventTarget, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			addEventListener: {
				value(this: EventTarget, type: string, listener: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean) {
					if (!listener) {
						return;
					}

					let opts = flattenMoreOptions(options);
					let callback = listener as EventListenerObject;

					if (isFunction(listener)) {
						callback = { handleEvent: listener };
					}

					addAnEventListener(this, {
						type,
						callback,
						capture: opts.capture || false,
						passive: opts.passive || null,
						once: opts.once || false,
						signal: opts.signal || null,
						removed: false,
					});
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			removeEventListener: {
				value(this: EventTarget, type: string, listener: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean) {
					if (!listener) {
						return;
					}

					let capture = flattenOptions(options);
					let callback = listener as EventListenerObject;

					if (isFunction(listener)) {
						callback = { handleEvent: listener };
					}

					const eventListener = eventListenerListFor(this).find(
						(currentListener) => {
							const sameType = currentListener.type === type;
							const sameCallback = currentListener.callback === callback;
							const sameCapture = currentListener.capture === capture;
							const notRemoved = !currentListener.removed;

							if (sameType && sameCallback && sameCapture && notRemoved) {
								return listener;
							}
						}
					);

					if (eventListener) {
						removeAnEventListener(this, eventListener);
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			dispatchEvent: {
				value(this: EventTarget, event: Event) {
					if (isFlagSetFor(event, EventFlag.Dispatch) || isFlagUnsetFor(event, EventFlag.Initialized)) {
						throw new InvalidStateError(this, 'dispatchEvent', 'InvalidStateError');
					}

					setIsTrustedToFalseFor(event);

					return dispatch(event, this);
				},
			},
			/**
			 * @TODO - Takes an event type and returns an Observable of that event type as
			 * part of the Observable API.
			 *
			 * @see https://github.com/WICG/observable#eventtarget-integration
			 *
			 * @example
			 * ```TS
			 * $element
			 *   .when('click')
			 *   .filter((e) => e.target.matches('.foo'))
			 *   .map((e) => ({ x: e.clientX, y: e.clientY }))
			 *   .subscribe({ next: handleClickAtPoint });
			 * ```
			 */
			when: {
				value: noop,
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: EventTarget,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: EventTarget) {
					eraseAllEventListenersAndHandlers(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: EventTarget) {
					eraseAllEventListenersAndHandlers(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'EventTarget',
				configurable: true,
			},
		}))
	},
});

Object.seal(EventTarget);

if (!globalThis.EventTarget) {
	globalThis.EventTarget = EventTarget;
}

/**
 * Checks that an `unknown` value is an {@link EventTarget}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link EventTarget} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link EventTarget}.
 */
export const isEventTarget = (value: unknown): value is EventTarget =>
	typeof globalThis.EventTarget !== 'undefined' &&
	value instanceof globalThis.EventTarget;

export default EventTarget;
