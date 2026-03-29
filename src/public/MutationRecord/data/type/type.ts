/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-type
 */
const type = new WeakMap<MutationRecord, MutationRecord['type']>();

export const disposeTypeOf = (record: MutationRecord) => {
	type.delete(record);
};

export const typeOf = (record: MutationRecord) => {
	return type.get(record) || 'childList';
};

export const initializeTypeOf = (record: MutationRecord) => {
	if (!type.has(record)) {
		type.set(record, 'childList');
	}
};

export const setType = (record: MutationRecord, value: MutationRecord['type']) => {
	type.set(record, value);
};
