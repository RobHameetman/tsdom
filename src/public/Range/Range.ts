// import implOf from '#_internals/impl';
import IndexSizeError from '#errors/IndexSizeError';
import InvalidNodeTypeError from '#errors/InvalidNodeTypeError';
import NotSupportedError from '#errors/NotSupportedError';
import type { BoundaryPoint } from '#public/AbstractRange/types/BoundaryPoint';
import AbstractRange from '#public/AbstractRange';
import { endOf, setEndOf } from '#public/AbstractRange/boundaries/end';
import { setStartOf, startOf } from '#public/AbstractRange/boundaries/start';
import { indexOf, isInclusiveDescendantOf } from '#tree/Tree/relationships';
import lengthOf from '#tree/NodeTree/algorithms/length';

export enum RangePointComparison {
	START_TO_START = 0,
	START_TO_END = 1,
	END_TO_END = 2,
	END_TO_START = 3,
}

export const RANGE_POINT_COMPARISONS = Object.freeze([
	RangePointComparison.START_TO_START,
	RangePointComparison.START_TO_END,
	RangePointComparison.END_TO_END,
	RangePointComparison.END_TO_START,
]);

/**
 * A {@link Range} object is a lightweight range that represents a piece
 * of content within a node tree between two boundary points that does not
 * update when the node tree mutates. It is therefore not subject to the same
 * maintenance cost as live ranges.
 */
export const Range = function(this: Range) {
	return this;
} as unknown as typeof global.Range;

// export const Range = implOf<typeof global.Range>(
// 	function Range(this: Range) {
// 		// return AbstractRange.call(this);
// 		initializeStartOf(this);
// 		initializeEndOf(this);
// 	}, {
// 		exposed: true,
// 	},
// );

/**
 * Checks that an `unknown` value is an {@link Range}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Range`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Range}.
 */
export const isRange = (value: unknown): value is Range =>
	value instanceof Range;

Object.defineProperties(Range, {
	prototype: {
		value: Object.seal(Object.create(AbstractRange.prototype, {
			commonAncestorContainer: {
				get(this: Range) {
					let container = this.startContainer;

					while(!isInclusiveDescendantOf(this.endContainer, container)) {
						container = (container as Node).parentNode as ParentNode;
					}

					return container;
				},
				configurable: true,
				enumerable: true,
			},
			cloneContents: {
				value(this: Range) {
					/**
					 * @TODO
					 */
					return document.createDocumentFragment();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			cloneRange: {
				value(this: Range) {
					/**
					 * @TODO
					 */
					return structuredClone(this) as Range;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			collapse: {
				value(this: Range, toStart = false) {
					if (toStart) {
						setEndOf(this, startOf(this) as BoundaryPoint);
					} else {
						setStartOf(this, endOf(this) as BoundaryPoint);
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			compareBoundaryPoints: {
				value(this: Range, how: number, sourceRange: Range) {
					if (!RANGE_POINT_COMPARISONS.includes(how)) {
						throw new NotSupportedError(this, 'compareBoundaryPoints', 'The comparison method provided must be one of \'START_TO_START\', \'START_TO_END\', \'END_TO_END\', or \'END_TO_START\'.');
					}

					/**
					 * @TODO
					 */
					return 0;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			comparePoint: {
				value(this: Range, node: Node, offset: number) {
					/**
					 * @TODO
					 */
					return 0;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			createContextualFragment: {
				value(this: Range, string: string) {
					/**
					 * @TODO
					 */
					return document.createDocumentFragment();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			deleteContents: {
				value(this: Range) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			detach: {
				value(this: Range) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			extractContents: {
				value(this: Range) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getBoundingClientRect: {
				value(this: Range) {
					/**
					 * @TODO
					 */
					return {} as DOMRect;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getClientRects: {
				value(this: Range) {
					/**
					 * @TODO
					 */
					return {} as DOMRectList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			insertNode: {
				value(this: Range, node: Node) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			intersectsNode: {
				value(this: Range, node: Node) {
					/**
					 * @TODO
					 */
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			isPointInRange: {
				value(this: Range, offset: number) {
					/**
					 * @TODO
					 */
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			selectNode: {
				value(this: Range, node: Node) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			selectNodeContents: {
				value(this: Range, node: Node) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setEnd: {
				value(this: Range, node: Node, offset: number) {
					if (node instanceof DocumentType) {
						throw new InvalidNodeTypeError(this, 'setStart', 'The node before which the range boundary is to be set is not a child of a parent node.');
					}

					if (offset > lengthOf(node)) {
						throw new IndexSizeError(this, 'setStart', 'The offset provided is larger than the number of child nodes.');
					}

					const boundaryPoint = [node, offset] as BoundaryPoint;

					/**
					 * If range’s root is not node’s root or boundaryPoint is before
					 * range’s start, then set range’s start to boundaryPoint.
					 */

					setEndOf(this, boundaryPoint);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setEndAfter: {
				value(this: Range, node: Node) {
					const parent = node.parentNode;

					if (!parent) {
						throw new InvalidNodeTypeError(this, 'setEndAfter', 'the given Node has no parent.');
					}

					this.setEnd(parent, indexOf(node) + 1);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setEndBefore: {
				value(this: Range, node: Node) {
					const parent = node.parentNode;

					if (!parent) {
						throw new InvalidNodeTypeError(this, 'setEndBefore', 'the given Node has no parent');
					}

					this.setEnd(parent, indexOf(node));
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setStart: {
				value(this: Range, node: Node, offset: number) {
					if (node instanceof DocumentType) {
						throw new InvalidNodeTypeError(this, 'setStart', 'The node before which the range boundary is to be set is not a child of a parent node.');
					}

					if (offset > lengthOf(node)) {
						throw new IndexSizeError(this, 'setStart', 'The offset provided is larger than the number of child nodes.');
					}

					const boundaryPoint = [node, offset] as BoundaryPoint;

					/**
					 * If range’s root is not node’s root or boundaryPoint is after
					 * range’s end, then set range’s end to boundaryPoint.
					 */

					setStartOf(this, boundaryPoint);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setStartAfter: {
				value(this: Range, node: Node) {
					const parent = node.parentNode;

					if (!parent) {
						throw new InvalidNodeTypeError(this, 'setStartAfter', 'The node before which the range boundary is to be set is not a child of a parent node.');
					}

					this.setStart(parent, indexOf(node) + 1);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setStartBefore: {
				value(this: Range, node: Node) {
					const parent = node.parentNode;

					if (!parent) {
						throw new InvalidNodeTypeError(this, 'setStartBefore', 'the given Node has no parent');
					}

					this.setStart(parent, indexOf(node));
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			surroundContents: {
				value(this: Range, newParent: Node) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			toString: {
				value(this: Range) {
					/**
					 * @TODO
					 */
					return '';
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			START_TO_START: {
				value: RangePointComparison.START_TO_START,
				enumerable: true,
			},
			START_TO_END: {
				value: RangePointComparison.START_TO_END,
				enumerable: true,
			},
			END_TO_END: {
				value: RangePointComparison.END_TO_END,
				enumerable: true,
			},
			END_TO_START: {
				value: RangePointComparison.END_TO_START,
				enumerable: true,
			},
			constructor: {
				value: Range,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: Range) {
					if (Symbol.dispose in AbstractRange.prototype) {
						(AbstractRange.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: Range) {
					if (Symbol.asyncDispose in AbstractRange.prototype) {
						await (AbstractRange.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Range',
				configurable: true,
			},
		})),
	},
	START_TO_START: {
		value: RangePointComparison.START_TO_START,
		enumerable: true,
	},
	START_TO_END: {
		value: RangePointComparison.START_TO_END,
		enumerable: true,
	},
	END_TO_END: {
		value: RangePointComparison.END_TO_END,
		enumerable: true,
	},
	END_TO_START: {
		value: RangePointComparison.END_TO_START,
		enumerable: true,
	},
});

Object.seal(Range);

export default Range;
