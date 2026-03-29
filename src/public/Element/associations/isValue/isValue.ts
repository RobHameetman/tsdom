/**
 * @see https://dom.spec.whatwg.org/#concept-element-is-value
 */
const isValue = new WeakMap<Element, string | null>();

export const disposeIsValueOf = (node: Element) => {
	isValue.delete(node);
};

export const initializeIsValueOf = (node: Element) => {
	if (!isValue.has(node)) {
		isValue.set(node, null);
	}
};

export const setIsValueOf = (node: Element, to: string) => {
	isValue.set(node, to);
};

export const isValueOf = (node: Element) => {
	return isValue.get(node) || null;
};
