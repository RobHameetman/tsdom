import implOf from '@/_internals/impl';
import { disposeEndOf, endOffsetOf } from '@/public/AbstractRange/boundaries/end';
import { disposeStartOf, startContainerOf, startOffsetOf } from '@/public/AbstractRange/boundaries/start';

export const AbstractRange = function(this: AbstractRange) {
	throw new TypeError('Failed to construct \'AbstractRange\': Illegal constructor');
} as unknown as typeof global.AbstractRange;

// export const AbstractRange = implOf<typeof global.AbstractRange>(
// 	function AbstractRange(this: AbstractRange) {
// 		// throw new TypeError('Failed to construct \'AbstractRange\': Illegal constructor');
// 		return this;
// 	}, {
// 		onInit(instance: Range | StaticRange) {
// 			initializeStartOf(instance);
// 			initializeEndOf(instance);
// 		},
// 		subtypes: [
// 			Range,
// 			StaticRange,
// 		],
// 	}
// );

Object.defineProperties(AbstractRange, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			collapsed: {
				get(this: AbstractRange) {
					return this.startContainer === this.endContainer &&
						this.startOffset === this.endOffset;
				},
				configurable: true,
				enumerable: true,
			},
			endContainer: {
				get(this: AbstractRange) {
					return {} as Node;
				},
				configurable: true,
				enumerable: true,
			},
			endOffset: {
				get(this: AbstractRange) {
					return endOffsetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			startContainer: {
				get(this: AbstractRange) {
					return startContainerOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			startOffset: {
				get(this: AbstractRange) {
					return startOffsetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			constructor: {
				value: AbstractRange,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: AbstractRange) {
					disposeEndOf(this);
					disposeStartOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: AbstractRange) {
					disposeEndOf(this);
					disposeStartOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'AbstractRange',
				configurable: true,
			},
		})),
	},
});

Object.seal(AbstractRange);

if (!globalThis.AbstractRange) {
	globalThis.AbstractRange = AbstractRange;
}

/**
 * Checks that an `unknown` value is an {@link AbstractRange}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `AbstractRange`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link AbstractRange}.
 */
export const isAbstractRange = (value: unknown): value is AbstractRange =>
	typeof globalThis.AbstractRange !== 'undefined' &&
	value instanceof globalThis.AbstractRange;

export default AbstractRange;
