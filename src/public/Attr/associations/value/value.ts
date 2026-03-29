/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-value
 */
const value = new WeakMap<Attr, string>();

export const disposeValueOf = (node: Attr) => {
	value.delete(node);
};

export const initializeValueOf = (node: Attr, to: string) => {
	if (!value.has(node)) {
		value.set(node, to);
	}
};

export const setValueOf = (node: Attr, to: string) => {
	value.set(node, to);
};

export const valueOf = (node: Attr) => {
	return value.get(node) || '';
};
