/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-attributenamespace
 */
const attributeNamespace = new WeakMap<MutationRecord, MutationRecord['attributeNamespace']>();

export const attributeNamespaceOf = (record: MutationRecord) => {
	return attributeNamespace.get(record) || null;
};

export const disposeAttributeNamespaceOf = (record: MutationRecord) => {
	attributeNamespace.delete(record);
};

export const setAttributeNamespace = (record: MutationRecord, value: MutationRecord['attributeNamespace']) => {
	attributeNamespace.set(record, value);
};
