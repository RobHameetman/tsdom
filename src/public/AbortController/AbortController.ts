import { disposeSignalOf, initializeSignalOf, signalOf } from '@/public/AbortController/associations/signal';
import signalAbort from '@/public/AbortController/algorithms/signalAbort';
import { initializeAbortAlgorithmsOf } from '@/public/AbortSignal/associations/abortAlgorithms';
import { initializeAbortReasonOf } from '@/public/AbortSignal/associations/abortReason';
import { initializeDependentOf } from '@/public/AbortSignal/associations/dependent';
import { initializeDependentSignalsOf } from '@/public/AbortSignal/associations/dependentSignals';
import { initializeSourceSignalsOf } from '@/public/AbortSignal/associations/sourceSignals';

/**
 * @see https://dom.spec.whatwg.org/#dom-abortcontroller-abortcontroller
 */
export const AbortController = function(this: AbortController) {
	// console.log('creating a new AbortSignal...');
	// const signal = new AbortSignal();
	const signal = Object.create(AbortSignal.prototype) as AbortSignal;

	initializeAbortReasonOf(signal);
	initializeAbortAlgorithmsOf(signal);
	initializeDependentOf(signal);
	initializeDependentSignalsOf(signal);
	initializeSourceSignalsOf(signal);

	initializeSignalOf(this, signal);

	console.log(signal);

	return this;
} as unknown as typeof global.AbortController;

// export const AbortController = implOf<typeof global.AbortController>(
// 	function AbortController(this: AbortController) {
// 		// console.log('creating a new AbortSignal...');
// 		const signal = new AbortSignal();
// 		// const signal = Object.create(AbortSignal.prototype) as AbortSignal;

// 		// initializeAbortReasonOf(signal);
// 		// initializeAbortAlgorithmsOf(signal);
// 		// initializeDependentOf(signal);
// 		// initializeDependentSignalsOf(signal);
// 		// initializeSourceSignalsOf(signal);

// 		// initializeSignalOf(this, signal);

// 		console.log(signal);

// 		return this;
// 	}, {
// 		exposed: true,
// 	},
// );

Object.defineProperties(AbortController, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			signal: {
				get(this: AbortController) {
					// console.log(signalOf(this));
					return signalOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			abort: {
				value(this: AbortController, reason?: unknown) {
					signalAbort(this, reason);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: AbortController,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: AbortController) {
					if (Symbol.dispose in AbortSignal.prototype) {
						(AbortSignal.prototype[Symbol.dispose] as Disposal).call(signalOf(this));
					}

					disposeSignalOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: AbortController) {
					if (Symbol.asyncDispose in AbortSignal.prototype) {
						(AbortSignal.prototype[Symbol.asyncDispose] as AsyncDisposal).call(signalOf(this));
					}

					disposeSignalOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'AbortController',
				configurable: true,
			},
		})),
	},
});

Object.seal(AbortController);

if (!globalThis.AbortController) {
	globalThis.AbortController = AbortController;
}

/**
 * Checks that an `unknown` value is an {@link AbortController}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `AbortController`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link AbortController}.
 */
export const isAbortController = (value: unknown): value is AbortController =>
	typeof globalThis.AbortController !== 'undefined' &&
	value instanceof globalThis.AbortController;

export default AbortController;
