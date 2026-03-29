/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-oldvalue
 */
const oldValue = new WeakMap<MutationRecord, MutationRecord['oldValue']>();

export const disposeOldValueOf = (record: MutationRecord) => {
	oldValue.delete(record);
};

export const oldValueOf = (record: MutationRecord) => {
	return oldValue.get(record) || null;
};

export const setOldValue = (record: MutationRecord, value: MutationRecord['oldValue']) => {
	oldValue.set(record, value);
};
