/**
 * @see https://dom.spec.whatwg.org/#nodeiterator-reference
 */
const reference = new WeakMap<NodeIterator, Node>();

export const disposeReferenceOf = (iterator: NodeIterator) => {
	reference.delete(iterator);
};

export const referenceOf = (iterator: NodeIterator) => {
	return reference.get(iterator) as Node;
};

export const setReferenceOf = (iterator: NodeIterator, node: Node) => {
	reference.set(iterator, node);
};
