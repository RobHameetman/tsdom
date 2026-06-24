import { type NodeFilterObject, isNodeFilterCallback } from '#public/NodeFilter';

/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-filter
 */
const filter = new WeakMap<NodeIterator, NodeFilterObject | null>();

export const disposeFilterOf = (iterator: NodeIterator) => {
	filter.delete(iterator);
};

export const filterOf = (iterator: NodeIterator) => {
	return filter.get(iterator) || null;
};

export const initializeFilterOf = (iterator: NodeIterator, initialFilter = null as NodeFilterObject | null) => {
	if (!filter.has(iterator)) {
		filter.set(iterator, initialFilter);
	}
};

export const setFilterOf = (iterator: NodeIterator, acceptNode: NodeFilter | null) => {
	filter.set(iterator, isNodeFilterCallback(acceptNode) ? { acceptNode } : acceptNode);
};
