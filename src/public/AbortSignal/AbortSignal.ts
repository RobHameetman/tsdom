// import implOf from '#_internals/impl';
import AbortError from '#errors/AbortError';
import EventTarget from '#public/EventTarget';
import aborted from '#public/AbortSignal/algorithms/aborted';
import createADependentAbortSignal from '#public/AbortSignal/algorithms/createADependentAbortSignal';
import { disposeAbortAlgorithmsOf, initializeAbortAlgorithmsOf } from '#public/AbortSignal/associations/abortAlgorithms';
import { abortReasonOf, disposeAbortReasonOf, initializeAbortReasonOf, setAbortReasonOf } from '#public/AbortSignal/associations/abortReason';
import { disposeDependentOf, initializeDependentOf } from '#public/AbortSignal/associations/dependent';
import { disposeDependentSignalsOf, initializeDependentSignalsOf } from '#public/AbortSignal/associations/dependentSignals';
import { disposeSourceSignalsOf, initializeSourceSignalsOf } from '#public/AbortSignal/associations/sourceSignals';
import activateAnEventHandler from '#public/EventTarget/algorithms/activateAnEventHandler';
import deactivateAnEventHandler from '#public/EventTarget/algorithms/deactivateAnEventHandler';
import determineTheTargetOfAnEventHandler from '#public/EventTarget/algorithms/determineTheTargetOfAnEventHandler';
import getTheCurrentValueOfTheEventHandler from '#public/EventTarget/algorithms/getTheCurrentValueOfTheEventHandler';
import { eventHandlerMapOf } from '#public/EventTarget/associations';

export const AbortSignal = function(this: AbortSignal) {
	throw new TypeError('Failed to construct \'AbortSignal\': Illegal constructor');
} as unknown as typeof global.AbortSignal;

// export const AbortSignal = implOf<typeof global.AbortSignal>(
// 	function AbortSignal(this: AbortSignal) {
// 		// EventTarget.call(this);

// 		return this;
// 	}, {
// 		onInit: (instance) => {
// 			initializeAbortReasonOf(instance);
// 			initializeAbortAlgorithmsOf(instance);
// 			initializeDependentOf(instance);
// 			initializeDependentSignalsOf(instance);
// 			initializeSourceSignalsOf(instance);
// 		},
// 		subtypes: [
// 			AbortController,
// 		]
// 	},
// );

// const AbortSignal = function(this: AbortSignal) {
// 	throw new TypeError(`Failed to construct 'AbortSignal': Illegal constructor`);
// } as unknown as typeof global.AbortSignal;

// export const AbortSignal = function AbortSignal(this: AbortSignal) {
// 	EventTarget.call(this);

// 	initializeAbortReasonOf(this);
// 	initializeAbortAlgorithmsOf(this);
// 	initializeDependentOf(this);
// 	initializeDependentSignalsOf(this);
// 	initializeSourceSignalsOf(this);

// 	return this;
// } as unknown as typeof global.AbortSignal;

/**
 * Checks that an `unknown` value is an {@link AbortSignal}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `AbortSignal`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link AbortSignal}.
 */
export const isAbortSignal = (value: unknown): value is AbortSignal =>
	typeof globalThis.AbortSignal !== 'undefined' &&
	value instanceof globalThis.AbortSignal;

Object.defineProperties(AbortSignal, {
	prototype: {
		value: Object.seal(Object.create(EventTarget.prototype, {
			aborted: {
				get(this: AbortSignal) {
					return aborted(this);
				},
				configurable: true,
				enumerable: true,
			},
			onabort: {
				get(this: AbortSignal) {
					const eventTarget = determineTheTargetOfAnEventHandler(this, 'abort');

					if (eventTarget === null) {
						return null;
					}

					return getTheCurrentValueOfTheEventHandler(eventTarget, 'abort');
				},
				set(this: AbortSignal, handler: ((this: AbortSignal, ev: Event) => unknown) | null) {
					const eventTarget = determineTheTargetOfAnEventHandler(this, 'abort');

					if (eventTarget === null) {
						return;
					}

					if (handler === null) {
						deactivateAnEventHandler(eventTarget, 'abort');
					} else {
						const handlerMap = eventHandlerMapOf<AbortSignal>(eventTarget as EventTarget);
						const eventHandler = handlerMap['abort'];

						eventHandler.value = handler;
						activateAnEventHandler(eventTarget, 'abort');
					}
				},
				configurable: true,
				enumerable: true,
			},
			reason: {
				get(this: AbortSignal) {
					return abortReasonOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			throwIfAborted: {
				value(this: AbortSignal) {
					if (this.aborted) {
						throw this.reason;
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: AbortSignal,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: AbortSignal) {
					disposeAbortReasonOf(this);
					disposeAbortAlgorithmsOf(this);
					disposeDependentOf(this);
					disposeDependentSignalsOf(this);
					disposeSourceSignalsOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: AbortSignal) {
					disposeAbortReasonOf(this);
					disposeAbortAlgorithmsOf(this);
					disposeDependentOf(this);
					disposeDependentSignalsOf(this);
					disposeSourceSignalsOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'AbortSignal',
				configurable: true,
			},
		})),
	},
	abort: {
		value(reason?: unknown) {
			const signal = Object.create(AbortSignal.prototype);

			if (reason !== undefined && reason !== null) {
				setAbortReasonOf(signal, reason);
			} else {
				throw new AbortError(signal, 'abort', 'AbortSignal.abort() called without a reason');
			}

			return signal;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	any: {
		value(signals: Array<AbortSignal>) {
			return createADependentAbortSignal(signals, AbortSignal, globalThis);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	timeout: {
		value(milliseconds: number) {
			const signal = Object.create(AbortSignal.prototype);
			const global = self;

			/**
			 * Run steps after a timeout given global, "AbortSignal-timeout", milliseconds, and the following step:
			 *   1. Queue a global task on the timer task source given global to signal abort given signal and a new "TimeoutError" DOMException.
			 */

			return signal;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
});

Object.seal(AbortSignal);

if (!globalThis.AbortSignal) {
	globalThis.AbortSignal = AbortSignal;
}

export default AbortSignal;
