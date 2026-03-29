/**
 * @see https://dom.spec.whatwg.org/#iterator-collection
 */
const iteratorCollection = new WeakMap<NodeIterator, NodeList | HTMLCollection>();

export const disposeIteratorCollectionOf = (iterator: NodeIterator) => {
	iteratorCollection.delete(iterator);
};

export const firstNodeInIteratorCollectionFollowing = (node: Node, iterator: NodeIterator) => {
	const collection = iteratorCollectionOf(iterator);
	const index = Array.from(collection).indexOf(node);

	return collection.item(index + 1);
};

export const firstNodeInIteratorCollectionPreceding = (node: Node, iterator: NodeIterator) => {
	const collection = iteratorCollectionOf(iterator);
	const index = Array.from(collection).indexOf(node);

	return collection.item(index - 1);
};

export const iteratorCollectionOf = (iterator: NodeIterator) => {
	return iteratorCollection.get(iterator) as NodeList | HTMLCollection;
};

export const initializeIteratorCollectionOf = (
	iterator: NodeIterator,
	collection = Object.create(NodeList.prototype) as NodeList | HTMLCollection,
) => {
	if (!iteratorCollection.has(iterator)) {
		iteratorCollection.set(iterator, collection);
	}
};
