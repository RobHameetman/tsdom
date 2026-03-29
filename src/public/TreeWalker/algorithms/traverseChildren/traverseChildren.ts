import filter from '@/public/TreeWalker/algorithms/filter';
import { isTreeWalkersRoot } from '@/public/TreeWalker/associations/root';

export type ChildrenTraversal = 'first' | 'last';

/**
 * Traverse the children of the current node in the specified direction.
 *
 * @see https://dom.spec.whatwg.org/#concept-traverse-children
 *
 * @param walker - The TreeWalker instance.
 * @param type - The direction to traverse (`'first'` or `'last'`).
 *
 * @returns The next node to visit, or null if there are no more nodes.
 */
export const traverseChildren = (walker: TreeWalker, type: ChildrenTraversal) => {
	let node = walker.currentNode as Node | null;

	node = type === 'first'
		? node!.firstChild
		: node!.lastChild;

	while (node) {
		const result = filter(node as Node, walker);

		if (result === NodeFilter.FILTER_ACCEPT) {
			walker.currentNode = node;

			return node;
		} else if (result === NodeFilter.FILTER_SKIP) {
			const child = type === 'first'
				? node.firstChild
				: node.lastChild;

			if (child) {
				node = child;

				continue;
			}
		}

		while (node) {
			const sibling = type === 'first'
				? node.nextSibling
				: node.previousSibling;

			if (sibling) {
				node = sibling;

				break;
			}

			const parent = node.parentNode as ParentNode | null;

			if (!parent || isTreeWalkersRoot(walker, parent) || parent === walker.currentNode) {
				return null;
			}

			node = parent;
		}
	}

	return null;
};

export default traverseChildren;
