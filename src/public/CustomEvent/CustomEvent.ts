import initialize from '@/public/Event/algorithms/initialize';
import innerEventCreation from '@/public/Event/algorithms/innerEventCreation';
import { EventFlag, isFlagSetFor } from '@/public/Event/associations/flags';
import { setTypeOf } from '@/public/Event/attributes/type';
import { detailOf, setDetailOf } from '@/public/CustomEvent/attributes/detail';

export const CustomEvent = function<T = unknown>(this: CustomEvent<T>, type: string, eventInitDict = {} as EventInit) {
	const event = innerEventCreation(
		Object.getPrototypeOf(this).constructor,
		null,
		performance.now(),
		eventInitDict,
	);

	setTypeOf(event, type);

	return event;
} as unknown as typeof global.CustomEvent;

// export const CustomEvent = impl<typeof global.CustomEvent>(
// 	function CustomEvent<T = unknown>(
// 		this: CustomEvent<T>,
// 		type: string,
// 		eventInitDict = {} as EventInit,
// 	) {
// 			const event = innerEventCreation(
// 				Object.getPrototypeOf(this).constructor,
// 				null,
// 				performance.now(),
// 				eventInitDict,
// 			);

// 			typeAttributes.set(event, type);

// 			return event;
// 	}, {
// 	onInit: (instance, args) => {},
// 	exposed: true,
// });

Object.defineProperties(CustomEvent, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			detail: {
				get<T = unknown>(this: CustomEvent<T>) {
					return detailOf(this) as T;
				},
				configurable: true,
				enumerable: true,
			},
			initCustomEvent: {
				value<T = unknown>(this: CustomEvent<T>, type: string, bubbles = false, cancelable = false, detail?: T) {
					if (isFlagSetFor(this, EventFlag.Dispatch)) {
						return;
					}

					initialize(this, type, bubbles, cancelable);
					setDetailOf(this, detail);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: CustomEvent,
				writable: true,
				configurable: true,
			},
			[Symbol.toStringTag]: {
				value: 'CustomEvent',
				configurable: true,
			},
		})),
	},
});

Object.seal(CustomEvent);

if (!globalThis.CustomEvent) {
	globalThis.CustomEvent = CustomEvent;
}

/**
 * Checks that an `unknown` value is a {@link CustomEvent}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link CustomEvent}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CustomEvent}.
 */
export const isCustomEvent = (value: unknown): value is CustomEvent =>
	typeof globalThis.CustomEvent !== 'undefined' &&
	value instanceof globalThis.CustomEvent;

export default CustomEvent;
