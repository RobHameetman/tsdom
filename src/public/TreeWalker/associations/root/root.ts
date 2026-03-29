/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-root
 */
const root = new WeakMap<TreeWalker, Node>();

export const disposeRootOf = (iterator: TreeWalker) => {
	root.delete(iterator);
};

export const initializeRootOf = (iterator: TreeWalker, node: Node) => {
	if (!root.has(iterator)) {
		root.set(iterator, node);
	}
};

export const isTreeWalkersRoot = (iterator: TreeWalker, node: Node) => {
	return rootOf(iterator) === node;
};

export const rootOf = (iterator: TreeWalker) => {
	return root.get(iterator) as Node;
};
