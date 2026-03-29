/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-removednodes
 */
const removedNodes = new WeakMap<MutationRecord, MutationRecord['removedNodes']>();

export const disposeRemovedNodesOf = (record: MutationRecord) => {
	removedNodes.delete(record);
};

export const removedNodesOf = (record: MutationRecord) => {
	return removedNodes.get(record) as MutationRecord['removedNodes'];
};

export const setRemovedNodes = (record: MutationRecord, nodes: MutationRecord['removedNodes']) => {
	removedNodes.set(record, nodes);
};
