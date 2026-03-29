/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-previoussibling
 */
const previousSibling = new WeakMap<MutationRecord, MutationRecord['previousSibling']>();

export const disposePreviousSiblingOf = (record: MutationRecord) => {
	previousSibling.delete(record);
};

export const previousSiblingOf = (record: MutationRecord) => {
	return previousSibling.get(record) || null;
};

export const setPreviousSibling = (record: MutationRecord, node: MutationRecord['previousSibling']) => {
	previousSibling.set(record, node);
};
