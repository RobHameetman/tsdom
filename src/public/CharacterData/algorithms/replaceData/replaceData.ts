import IndexSizeError from '@/errors/IndexSizeError';
import { liveRangesOf } from '@/tree/Tree/associations/liveRanges';
import lengthOf from '@/tree/NodeTree/algorithms/length';
import queueAMutationRecord from '@/public/MutationRecord/algorithms/queueAMutationRecord';
import { insertDataOf, removeDataFrom } from '@/public/CharacterData/associations/data';

/**
 * @see https://dom.spec.whatwg.org/#concept-cd-replace
 */
export const replaceData = (node: CharacterData, offset: number, count: number, data: string) => {
	let length = lengthOf(node);

	if (offset > length) {
		throw new IndexSizeError({}, 'replaceData', 'The offset is greater than the length.');
	}

	if (offset + count > length) {
		count = length - offset;
	}

	queueAMutationRecord('characterData', node, null, null, node.data, new NodeList(), new NodeList(), null, null);
	insertDataOf(node, data, offset);

	const deleteOffset = offset + data.length;

	removeDataFrom(node, deleteOffset, count);

	liveRangesOf(node)
		.filter((range) =>
			range.startContainer === node &&
			range.startOffset > offset &&
			range.startOffset <= offset + count
		)
		.forEach((range) => {
			range.setStart(node, offset);
		});

	liveRangesOf(node)
		.filter((range) =>
			range.endContainer === node &&
			range.endOffset > offset &&
			range.endOffset <= offset + count
		)
		.forEach((range) => {
			range.setEnd(node, offset);
		});

	liveRangesOf(node)
		.filter((range) =>
			range.startContainer === node &&
			range.startOffset > offset + count
		)
		.forEach((range) => {
			range.setStart(node, range.startOffset + data.length - count);
		});

	liveRangesOf(node)
		.filter((range) =>
			range.endContainer === node &&
			range.endOffset > offset + count
		)
		.forEach((range) => {
			range.setEnd(node, range.endOffset + data.length - count);
		});

	if (node.parentNode) {
		childrenChangedStepsOf(node.parentNode);
	}
};

export default replaceData;
