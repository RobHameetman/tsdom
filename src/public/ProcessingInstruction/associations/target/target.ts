/**
 * @see https://dom.spec.whatwg.org/#concept-pi-target
 */
const target = new WeakMap<ProcessingInstruction, string>();

export const disposeTargetOf = (node: ProcessingInstruction) => {
	target.delete(node);
};

export const targetOf = (node: ProcessingInstruction) => {
	return target.get(node) || '';
};

export const setTargetOf = (node: ProcessingInstruction, value: string) => {
	target.set(node, value);
};
