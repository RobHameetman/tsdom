/**
 * @see https://dom.spec.whatwg.org/#concept-attribute-element
 */
const element = new WeakMap<Attr, Element | null>();

export const disposeElementOf = (node: Attr) => {
	element.delete(node);
};

export const elementOf = (node: Attr) => {
	return element.get(node) || null;
};

export const elementIsNullOf = (node: Attr) => {
	return elementOf(node) === null;
};

export const initializeElementOf = (node: Attr) => {
	if (!element.has(node)) {
		element.set(node, null);
	}
};

export const setElementOf = (node: Attr, to: Element | null) => {
	element.set(node, to);
};
