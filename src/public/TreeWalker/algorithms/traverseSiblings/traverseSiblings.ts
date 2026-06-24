import filter from '#public/TreeWalker/algorithms/filter';
import { isTreeWalkersRoot } from '#public/TreeWalker/associations/root';

export type SiblingTraversal = 'next' | 'previous';

/**
 * Traverse the siblings of the current node in the specified direction.
 *
 * @see https://dom.spec.whatwg.org/#concept-traverse-siblings
 *
 * @param walker - The TreeWalker instance.
 * @param type - The direction to traverse (`'next'` or `'previous'`).
 *
 * @returns The next node to visit, or null if there are no more nodes.
 */
export const traverseSiblings = (walker: TreeWalker, type: SiblingTraversal) => {
	let node = walker.currentNode as Node | null;

	if (isTreeWalkersRoot(walker, node as Node)) {
		return null;
	}

	while (true) {
		let sibling = type === 'next'
				? node!.nextSibling
				: node!.previousSibling;

		while (sibling) {
			node = sibling;

			const result = filter(node, walker);

			if (result === NodeFilter.FILTER_ACCEPT) {
				walker.currentNode = node;

				return node;
			}

			sibling = type === 'next'
				? node.firstChild
				: node.lastChild;

			if (result === NodeFilter.FILTER_REJECT || !sibling) {
				sibling = type === 'next'
					? node.nextSibling
					: node.previousSibling;
			}
		}
	}

	return null;
};

export default traverseSiblings;
