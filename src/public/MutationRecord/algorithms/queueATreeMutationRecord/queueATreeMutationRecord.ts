import queueAMutationRecord from '@/public/MutationRecord/algorithms/queueAMutationRecord';

/**
 * Queues a tree mutation record for all interested mutation observers.
 *
 * @see https://dom.spec.whatwg.org/#queue-a-tree-mutation-record
 *
 * @param target - The target node of the mutation.
 * @param addedNodes - The added nodes of the mutation.
 * @param removedNodes - The removed nodes of the mutation.
 * @param nextSibling - The next sibling of the mutation.
 * @param previousSibling - The previous sibling of the mutation.
 */
export const queueATreeMutationRecord = (
	target: Node,
	addedNodes: MutationRecord['addedNodes'],
	removedNodes: MutationRecord['removedNodes'],
	nextSibling: MutationRecord['nextSibling'],
	previousSibling: MutationRecord['previousSibling'],
) => {
	queueAMutationRecord(
		'childList',
		target,
		null,
		null,
		null,
		addedNodes,
		removedNodes,
		nextSibling,
		previousSibling,
	);
};

export default queueATreeMutationRecord;
