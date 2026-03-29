/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-root
 */
const root = new WeakMap<NodeIterator, Node>();

export const disposeRootOf = (iterator: NodeIterator) => {
	root.delete(iterator);
};

export const initializeRootOf = (iterator: NodeIterator, node: Node) => {
	if (!root.has(iterator)) {
		root.set(iterator, node);
	}
};

export const isNodeIteratorsRoot = (iterator: NodeIterator, node: Node) => {
	return rootOf(iterator) === node;
};

export const rootOf = (iterator: NodeIterator) => {
	return root.get(iterator) as Node;
};
