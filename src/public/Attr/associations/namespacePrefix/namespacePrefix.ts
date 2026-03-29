/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-namespace-prefix
 */
const namespacePrefix = new WeakMap<Attr, string | null>();

export const disposeNamespacePrefixOf = (node: Attr) => {
	namespacePrefix.delete(node);
};

export const initializeNamespacePrefixOf = (node: Attr, value: string | null) => {
	if (!namespacePrefix.has(node)) {
		namespacePrefix.set(node, value);
	}
};

export const namespacePrefixOf = (node: Attr) => {
	return namespacePrefix.get(node) || null;
};

export const setNamespacePrefixOf = (node: Attr, value: string | null) => {
	if (!namespacePrefix.has(node)) {
		namespacePrefix.set(node, value);
	}
};
