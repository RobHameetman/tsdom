/**
 * @see https://dom.spec.whatwg.org/#treewalker-current
 */
const current = new WeakMap<TreeWalker, Node>();

export const disposeCurrentOf = (iterator: TreeWalker) => {
	current.delete(iterator);
};

export const currentOf = (iterator: TreeWalker) => {
	return current.get(iterator) as Node;
};

export const setCurrentOf = (iterator: TreeWalker, node: Node) => {
	current.set(iterator, node);
};
