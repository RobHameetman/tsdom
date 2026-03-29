import type { ParentOf } from '@/nodes/mixins/ParentNode/algorithms/isParentOf';
import isChildOf from '@/nodes/mixins/ChildNode/algorithms/isChildOf';

export type DescendantOf<N extends Node = Node> =
	N extends ParentOf<infer C>
		? C | DescendantOf<C>
		: never;

/**
 * Checks whether a node is a descendant of another node.
 * @see https://dom.spec.whatwg.org/#concept-tree-descendant
 *
 * @param descendant - A node that may be a descendant of `node`.
 * @param node - A node that may be an ancestor of `descendant`.
 * 
 * @returns The determination that `descendant` is a descendant of `node`.
 */
export const isDescendantOf = <N extends Node = Node>(
	node: N,
	descendant: Node,
): descendant is DescendantOf<N> => {
	if (descendant.parentNode === null) {
		return false;
	}

	if (isChildOf<N>(descendant, node)) {
		return true;
	}

	return isDescendantOf(descendant.parentNode, node);
};

export default isDescendantOf;
