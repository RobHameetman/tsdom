import List from '#infra/List';
import initialize from '#public/Event/algorithms/initialize';
import innerEventCreation from '#public/Event/algorithms/innerEventCreation';
import { EventFlag, isFlagSetFor, isFlagUnsetFor, setFlagsOf } from '#public/Event/associations/flags';
import { pathOf } from '#public/Event/associations/path';
import { targetOf } from '#public/Event/associations/target';
import { canBubble } from '#public/Event/attributes/bubbles';
import { isCancelable } from '#public/Event/attributes/cancelable';
import { currentTargetOf } from '#public/Event/attributes/currentTarget';
import { EventPhase, eventPhaseOf } from '#public/Event/attributes/eventPhase';
import { timeStampOf } from '#public/Event/attributes/timeStamp';
import { typeOf, initializeTypeOf } from '#public/Event/attributes/type';

export const Event = function(this: Event, type: string, eventInitDict = {} as EventInit) {
	const event = innerEventCreation(
		Object.getPrototypeOf(this).constructor,
		null,
		performance.now(),
		eventInitDict,
	);

	initializeTypeOf(event, type);

	return event;
} as unknown as typeof global.Event;

// export const Event = implOf<typeof global.Event>(
// 	function Event(
// 		this: Event,
// 		type: string,
// 		eventInitDict = {} as EventInit,
// 	) {
// 		const event = innerEventCreation(
// 			Object.getPrototypeOf(this).constructor,
// 			null,
// 			performance.now(),
// 			eventInitDict,
// 		);

// 		initializeTypeOf(event, type);

// 		return event;
// 	}, {
// 	subtypes: [
// 		// AnimationEvent,
// 		// AnimationPlaybackEvent,
// 		// AudioProcessingEvent,
// 		// BeforeUnloadEvent,
// 		// BlobEvent,
// 		// ClipboardEvent,
// 		// CloseEvent,
// 		// ContentVisibilityAutoStateChangeEvent,
// 		// CookieChangeEvent,
// 		// CustomEvent,
// 		// DeviceMotionEvent,
// 		// DeviceOrientationEvent,
// 		// ErrorEvent,
// 		// FontFaceSetLoadEvent,
// 		// FormDataEvent,
// 		// GamepadEvent,
// 		// HashChangeEvent,
// 		// IDBVersionChangeEvent,
// 		// MIDIConnectionEvent,
// 		// MIDIMessageEvent,
// 		// MediaEncryptedEvent,
// 		// MediaKeyMessageEvent,
// 		// MediaQueryListEvent,
// 		// MediaStreamTrackEvent,
// 		// MessageEvent,
// 		// OfflineAudioCompletionEvent,
// 		// PageRevealEvent,
// 		// PageTransitionEvent,
// 		// PaymentRequestUpdateEvent,
// 		// PictureInPictureEvent,
// 		// PopStateEvent,
// 		// ProgressEvent,
// 		// PromiseRejectionEvent,
// 		// RTCDTMFToneChangeEvent,
// 		// RTCDataChannelEvent,
// 		// RTCErrorEvent,
// 		// RTCPeerConnectionIceErrorEvent,
// 		// RTCPeerConnectionIceEvent,
// 		// RTCTrackEvent,
// 		// SecurityPolicyViolationEvent,
// 		// SpeechSynthesisEvent,
// 		// StorageEvent,
// 		// SubmitEvent,
// 		// ToggleEvent,
// 		// TrackEvent,
// 		// TransitionEvent,
// 		// UIEvent,
// 		// WebGLContextEvent,
// 	]
// });

Object.defineProperties(Event, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			bubbles: {
				get(this: Event) {
					return canBubble(this);
				},
				configurable: true,
				enumerable: true,
			},
			cancelBubble: {
				get(this: Event) {
					return isFlagSetFor(this, EventFlag.StopPropagation);
				},
				set(this: Event, value: boolean) {
					if (value) {
						this.stopPropagation();
					}
				},
				configurable: true,
				enumerable: true,
			},
			cancelable: {
				get(this: Event) {
					return isCancelable(this);
				}
			},
			composed: {
				get(this: Event) {
					return isFlagSetFor(this, EventFlag.Composed);
				},
			},
			currentTarget: {
				get(this: Event) {
					return currentTargetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			defaultPrevented: {
				get(this: Event) {
					return isFlagSetFor(this, EventFlag.Canceled);
				},
				configurable: true,
				enumerable: true,
			},
			eventPhase: {
				get(this: Event) {
					return eventPhaseOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			returnValue: {
				get(this: Event) {
					return isFlagUnsetFor(this, EventFlag.Canceled);
				},
				set(this: Event, value: boolean) {
					if (!value) {
						setFlagsOf(this, EventFlag.Canceled);
					}
				},
				configurable: true,
				enumerable: true,
			},
			srcElement: {
				get(this: Event) {
					return this.target;
				},
				configurable: true,
				enumerable: true,
			},
			target: {
				get(this: Event) {
					return targetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			timeStamp: {
				get(this: Event) {
					return timeStampOf(this);
				},
			},
			type: {
				get(this: Event) {
					return typeOf(this);
				},
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-event-composedpath
			 */
			composedPath: {
				value(this: Event) {
					let composedPath = List();
					let path = pathOf(this);

					if (!path || path.isEmpty()) {
						return composedPath;
					}

					let currentTarget = this.currentTarget as EventTarget;

					composedPath.append(currentTarget);

					let currentTargetIndex = 0;
					let currentTargetHiddenSubtreeLevel = 0;
					let index = path.length - 1;

					while (index >= 0) {
						const { invocationTarget, rootOfClosedTree, slotInClosedTree } = path[index];

						if (rootOfClosedTree) {
							currentTargetHiddenSubtreeLevel += 1;
						}

						if (invocationTarget === currentTarget) {
							currentTargetIndex = index;

							break;
						}

						if (slotInClosedTree) {
							currentTargetHiddenSubtreeLevel -= 1;
						}

						index -= 1;
					}

					let currentHiddenLevel = currentTargetHiddenSubtreeLevel;
					let maxHiddenLevel = currentTargetHiddenSubtreeLevel;

					index = currentTargetIndex - 1;

					while (index >= 0) {
						const { invocationTarget, rootOfClosedTree, slotInClosedTree } = path[index];

						if (rootOfClosedTree) {
							currentHiddenLevel += 1;
						}

						if (currentHiddenLevel <= maxHiddenLevel) {
							composedPath.prepend(invocationTarget);
						}

						if (slotInClosedTree) {
							currentHiddenLevel -= 1;

							if (currentHiddenLevel < maxHiddenLevel) {
								maxHiddenLevel = currentHiddenLevel;
							}
						}

						index -= 1;
					}

					currentHiddenLevel = currentTargetHiddenSubtreeLevel;
					maxHiddenLevel = currentTargetHiddenSubtreeLevel;
					index = currentTargetIndex + 1;

					while (index < path.length) {
						const { invocationTarget, rootOfClosedTree, slotInClosedTree } = path[index];

						if (slotInClosedTree) {
							currentHiddenLevel += 1;
						}

						if (currentHiddenLevel <= maxHiddenLevel) {
							composedPath.append(invocationTarget);
						}

						if (rootOfClosedTree) {
							currentHiddenLevel -= 1;

							if (currentHiddenLevel < maxHiddenLevel) {
								maxHiddenLevel = currentHiddenLevel;
							}
						}

						index += 1;
					}

					return composedPath;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			initEvent: {
				value(this: Event, type: string, bubbles = false, cancelable = false) {
					if (isFlagSetFor(this, EventFlag.Dispatch)) {
						return;
					}

					initialize(this, type, bubbles, cancelable);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			preventDefault: {
				value(this: Event) {
					setFlagsOf(this, EventFlag.Canceled);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			stopImmediatePropagation: {
				value(this: Event) {
					setFlagsOf(this, EventFlag.StopPropagation, EventFlag.StopImmediatePropagation);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			stopPropagation: {
				value(this: Event) {
					setFlagsOf(this, EventFlag.StopPropagation);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			NONE: {
				value: EventPhase.None,
				enumerable: true,
			},
			CAPTURING_PHASE: {
				value: EventPhase.Capturing,
				enumerable: true,
			},
			AT_TARGET: {
				value: EventPhase.AtTarget,
				enumerable: true,
			},
			BUBBLING_PHASE: {
				value: EventPhase.Bubbling,
				enumerable: true,
			},
			constructor: {
				value: Event,
				writable: true,
				configurable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Event',
				configurable: true,
			},
		})),
	},
	NONE: {
		value: EventPhase.None,
		enumerable: true,
	},
	CAPTURING_PHASE: {
		value: EventPhase.Capturing,
		enumerable: true,
	},
	AT_TARGET: {
		value: EventPhase.AtTarget,
		enumerable: true,
	},
	BUBBLING_PHASE: {
		value: EventPhase.Bubbling,
		enumerable: true,
	},
});

Object.seal(Event);

if (!globalThis.Event) {
	globalThis.Event = Event;
}

/**
 * Checks that an `unknown` value is an {@link Event}.
 *
 * Requirements:
 *   - `value` must be an instance of `EventTarget` if `window` is defined or an object if `window` is `undefined`.
 *   - `value.addEventListener()` must be a function if `window` is `undefined`.
 *   - `value.dispatchEvent()` must be a function if `window` is `undefined`.
 *   - `value.removeEventListener()` must be a function if `window` is `undefined`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Event}.
 */
export const isEvent = (value: unknown): value is EventTarget =>
	typeof globalThis.Event !== 'undefined' &&
	value instanceof globalThis.Event;

export default Event;
