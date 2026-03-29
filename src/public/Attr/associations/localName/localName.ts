/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-local-name
 */
const localName = new WeakMap<Attr, string>();

export const disposeLocalNameOf = (node: Attr) => {
	localName.delete(node);
};

export const initializeLocalNameOf = (node: Attr, value: string) => {
	if (!localName.has(node)) {
		localName.set(node, value);
	}
};

export const localNameOf = (node: Attr) => {
	return localName.get(node) as string;
};

export const setLocalNameOf = (node: Attr, value: string) => {
	if (!localName.has(node)) {
		localName.set(node, value);
	}
};
