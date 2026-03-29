/**
 * @see https://dom.spec.whatwg.org/#concept-element-local-name
 */
const localName = new WeakMap<Element, string>();

export const disposeLocalNameOf = (node: Element) => {
	localName.delete(node);
};

export const initializeLocalNameOf = (node: Element, value: string) => {
	if (!localName.has(node)) {
		localName.set(node, value);
	}
};

export const localNameOf = (node: Element) => {
	return localName.get(node) as string;
};
