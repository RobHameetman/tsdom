import { liveRangesOf } from '@/tree/Tree/associations/liveRanges';
import { inclusiveDescendantsOf, indexOf } from '@/tree/Tree/relationships/children';

/**
 * Gets the root of a live {@link Range}.
 *
 * @see https://dom.spec.whatwg.org/#live-range-pre-remove-steps
 *
 * @param range - A {@link Range} instance.
 *
 * @returns The root of the range's start node.
 */
export const liveRangePreremoveSteps = (node: Node) => {
	const parent = node.parentNode as ParentNode;
	const index = indexOf(node);

	liveRangesOf(node).forEach((range) => {
		if (inclusiveDescendantsOf(node).contains(range.startContainer)) {
			range.setStart(parent, index);
		}
	});

	liveRangesOf(node).forEach((range) => {
		if (inclusiveDescendantsOf(node).contains(range.endContainer)) {
			range.setEnd(parent, index);
		}
	});

	liveRangesOf(node).forEach((range) => {
		if (range.startContainer === parent && range.startOffset > index) {
			range.setStart(parent, range.startOffset - 1);
		}
	});

	liveRangesOf(node).forEach((range) => {
		if (range.endContainer === parent && range.endOffset > index) {
			range.setEnd(parent, range.endOffset - 1);
		}
	});
};

export default liveRangePreremoveSteps;
