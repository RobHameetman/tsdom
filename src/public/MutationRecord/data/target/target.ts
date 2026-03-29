/**
 * @see https://dom.spec.whatwg.org/#dom-mutationrecord-target
 */
const target = new WeakMap<MutationRecord, MutationRecord['target']>();

export const disposeTargetOf = (record: MutationRecord) => {
	target.delete(record);
};

export const initializeTargetOf = (record: MutationRecord) => {
	if (!target.has(record)) {
		target.set(record, document);
	}
};

export const targetOf = (record: MutationRecord) => {
	return target.get(record) || document;
};

export const setTarget = (record: MutationRecord, node: MutationRecord['target']) => {
	target.set(record, node);
};
