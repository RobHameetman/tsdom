/**
 * @see https://dom.spec.whatwg.org/#concept-element-namespace
 */
const namespace = new WeakMap<Element, string | null>();

export const disposeNamespaceOf = (node: Element) => {
	namespace.delete(node);
};

export const initializeNamespaceOf = (node: Element, value: string | null) => {
	if (!namespace.has(node)) {
		namespace.set(node, value);
	}
};

export const namespaceOf = (node: Element) => {
	return namespace.get(node) || null;
};
