/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-attributename
 */
const attributeName = new WeakMap<MutationRecord, MutationRecord['attributeName']>();

export const attributeNameOf = (record: MutationRecord) => {
	return attributeName.get(record) || null;
};

export const disposeAttributeNameOf = (record: MutationRecord) => {
	attributeName.delete(record);
};

export const setAttributeName = (record: MutationRecord, value: MutationRecord['attributeName']) => {
	attributeName.set(record, value);
};
