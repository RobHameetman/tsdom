/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-addednodes
 */
const addedNodes = new WeakMap<MutationRecord, MutationRecord['addedNodes']>();

export const addedNodesOf = (record: MutationRecord) => {
	return addedNodes.get(record) || null;
};

export const disposeAddedNodesOf = (record: MutationRecord) => {
	addedNodes.delete(record);
};

export const setAddedNodes = (record: MutationRecord, nodes: MutationRecord['addedNodes']) => {
	addedNodes.set(record, nodes);
};
