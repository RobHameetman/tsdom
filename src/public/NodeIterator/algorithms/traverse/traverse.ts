import { firstNodeInIteratorCollectionFollowing, firstNodeInIteratorCollectionPreceding } from '@/public/NodeIterator/associations/iteratorCollection';
import filter from '@/public/NodeIterator/algorithms/filter';
import { setPointerBeforeReferenceFor } from '@/public/NodeIterator/associations/pointerBeforeReference';
import { setReferenceOf } from '@/public/NodeIterator/associations/reference';

export type Traversal = 'next' | 'previous';

/**
 * Gets the root of a live {@link Range}.
 *
 * @see https://dom.spec.whatwg.org/#concept-nodeiterator-traverse
 *
 * @param range - A {@link Range} instance.
 *
 * @returns The root of the range's start node.
 */
export const traverse = (iterator: NodeIterator, type: Traversal) => {
	let node = iterator.referenceNode as Node | null;
	let beforeNode = iterator.pointerBeforeReferenceNode;

	while (true) {
		if (type === 'next') {
			if (!beforeNode) {
				node = firstNodeInIteratorCollectionFollowing(node as Node, iterator) || null;

				if (!node) {
					return null;
				}
			} else {
				beforeNode = false;
			}
		} else {
			if (beforeNode) {
				node = firstNodeInIteratorCollectionPreceding(node as Node, iterator) || null;

				if (!node) {
					return null;
				}
			} else {
				beforeNode = true;
			}
		}

		const result = filter(node as Node, iterator);

		if (result === NodeFilter.FILTER_ACCEPT) {
			break;
		}
	}

	setReferenceOf(iterator, node as Node);
	setPointerBeforeReferenceFor(iterator, beforeNode);

	return node;
};

export default traverse;
