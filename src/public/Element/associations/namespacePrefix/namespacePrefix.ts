/**
 * @see https://dom.spec.whatwg.org/#concept-element-namespace-prefix
 */
const namespacePrefix = new WeakMap<Element, string | null>();

export const disposeNamespacePrefixOf = (node: Element) => {
	namespacePrefix.delete(node);
};

export const initializeNamespacePrefixOf = (node: Element, value: string | null) => {
	if (!namespacePrefix.has(node)) {
		namespacePrefix.set(node, value);
	}
};

export const namespacePrefixOf = (node: Element) => {
	return namespacePrefix.get(node) || null;
};
