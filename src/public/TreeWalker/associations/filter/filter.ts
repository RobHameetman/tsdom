import { type NodeFilterObject, isNodeFilterCallback } from '@/public/NodeFilter';

/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-filter
 */
const filter = new WeakMap<TreeWalker, NodeFilterObject | null>();

export const disposeFilterOf = (iterator: TreeWalker) => {
	filter.delete(iterator);
};

export const filterOf = (iterator: TreeWalker) => {
	return filter.get(iterator) || null;
};

export const initializeFilterOf = (iterator: TreeWalker, initialFilter = null as NodeFilterObject | null) => {
	if (!filter.has(iterator)) {
		filter.set(iterator, initialFilter);
	}
};

export const setFilterOf = (iterator: TreeWalker, acceptNode: NodeFilter | null) => {
	filter.set(iterator, isNodeFilterCallback(acceptNode) ? { acceptNode } : acceptNode);
};
