import type { ParentOf } from '#nodes/mixins/ParentNode/algorithms/isParentOf';
import isDescendantOf, { type DescendantOf } from '#nodes/mixins/ChildNode/algorithms/isDescendantOf';

/**
 * An inclusive descendant is an object or one of its descendants.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-inclusive-descendant
 */
export type InclusiveDescendantOf<A extends Node = Node> =
A | DescendantOf<A>;

/**
 * Checks whether a node is an inclusive descendant of another node.
 *
 * @param descendant - A node that may be a descendant of `node`.
 * @param node - A node that may be an ancestor of `descendant`.
 * 
 * @returns The determination that `descendant` is a descendant of `node`.
 */
export const isInclusiveDescendantOf = <A extends Node = Node>(
	node: A,
	descendant: Node,
): descendant is DescendantOf<A> => {
	return descendant.isSameNode(node) || isDescendantOf(node, descendant);
};

export default isInclusiveDescendantOf;
