/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-local-name
 */
const qualifiedName = new WeakMap<Attr, string>();

export const disposeQualifiedNameOf = (node: Attr) => {
	qualifiedName.delete(node);
};

export const initializeQualifiedNameOf = (node: Attr, value: string) => {
	if (!qualifiedName.has(node)) {
		qualifiedName.set(node, value);
	}
};

export const qualifiedNameOf = (node: Attr) => {
	return qualifiedName.get(node) || '';
};
