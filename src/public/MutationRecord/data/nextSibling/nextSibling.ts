/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-nextsibling
 */
const nextSibling = new WeakMap<MutationRecord, MutationRecord['nextSibling']>();

export const disposeNextSiblingOf = (record: MutationRecord) => {
	nextSibling.delete(record);
};

export const nextSiblingOf = (record: MutationRecord) => {
	return nextSibling.get(record) || null;
};

export const setNextSibling = (record: MutationRecord, node: MutationRecord['nextSibling']) => {
	nextSibling.set(record, node);
};
