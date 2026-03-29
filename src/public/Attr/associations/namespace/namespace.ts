/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-namespace
 */
const namespace = new WeakMap<Attr, string | null>();

export const disposeNamespaceOf = (node: Attr) => {
	namespace.delete(node);
};

export const initializeNamespaceOf = (node: Attr, value: string | null) => {
	if (!namespace.has(node)) {
		namespace.set(node, value);
	}
};

export const namespaceOf = (node: Attr) => {
	return namespace.get(node) || null;
};

export const setNamespaceOf = (node: Attr, value: string | null) => {
	if (!namespace.has(node)) {
		namespace.set(node, value);
	}
};
