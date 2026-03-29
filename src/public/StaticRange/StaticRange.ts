import { InvalidNodeTypeError } from '@/errors/InvalidNodeTypeError';
import AbstractRange from '@/public/AbstractRange';
import { setEndOf } from '@/public/AbstractRange/boundaries/end';
import { setStartOf } from '@/public/AbstractRange/boundaries/start';

/**
 * A {@link StaticRange} object is a lightweight range that represents a piece
 * of content within a node tree between two boundary points that does not
 * update when the node tree mutates. It is therefore not subject to the same
 * maintenance cost as live ranges.
 */
export const StaticRange = function(this: StaticRange, init: StaticRangeInit) {
	const { endContainer, endOffset, startContainer, startOffset } = init;

	const endIsDocTypeOrAttr = endContainer instanceof DocumentType || endContainer instanceof Attr;
	const startIsDocTypeOrAttr = startContainer instanceof DocumentType || startContainer instanceof Attr;

	if (startIsDocTypeOrAttr || endIsDocTypeOrAttr) {
		throw new InvalidNodeTypeError(this, 'StaticRange', 'Neither startContainer nor endContainer can be a DocumentType or Attribute node.');
	}

	setEndOf(this, [endContainer, endOffset]);
	setStartOf(this, [startContainer, startOffset]);
} as unknown as typeof global.StaticRange;

// export const StaticRange = implOf<typeof global.StaticRange>(
// 	function StaticRange(this: StaticRange, init: StaticRangeInit) {
// 		// AbstractRange.call(this);
// 		initializeEndOf(this);
// 		initializeStartOf(this);

// 		const { endContainer, startContainer } = init;

// 		const endIsDocTypeOrAttr = endContainer instanceof DocumentType || endContainer instanceof Attr;
// 		const startIsDocTypeOrAttr = startContainer instanceof DocumentType || startContainer instanceof Attr;

// 		if (startIsDocTypeOrAttr || endIsDocTypeOrAttr) {
// 			throw new InvalidNodeTypeError(this, 'StaticRange', 'Neither startContainer nor endContainer can be a DocumentType or Attribute node.');
// 		}

// 		setEndOf(this, [init.endContainer, init.endOffset]);
// 		setStartOf(this, [init.startContainer, init.startOffset]);

// 		return this;
// 	}, {
// 		exposed: true,
// 	},
// );

Object.defineProperties(StaticRange, {
	prototype: {
		value: Object.seal(Object.create(AbstractRange.prototype, {
			constructor: {
				value: StaticRange,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: StaticRange) {
					if (Symbol.dispose in AbstractRange.prototype) {
						(AbstractRange.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: StaticRange) {
					if (Symbol.asyncDispose in AbstractRange.prototype) {
						await (AbstractRange.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'StaticRange',
				configurable: true,
			},
		})),
	},
});

Object.seal(StaticRange);

if (!globalThis.StaticRange) {
	globalThis.StaticRange = StaticRange;
}

/**
 * Checks that an `unknown` value is an {@link StaticRange}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `StaticRange`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link StaticRange}.
 */
export const isStaticRange = (value: unknown): value is StaticRange =>
	typeof globalThis.StaticRange !== 'undefined' &&
	value instanceof globalThis.StaticRange;

export default StaticRange;
