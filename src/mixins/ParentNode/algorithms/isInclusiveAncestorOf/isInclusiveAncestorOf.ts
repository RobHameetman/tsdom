import type { ParentOf } from '@/nodes/mixins/ParentNode/algorithms/isParentOf';
import isAncestorOf, { type AncestorOf } from '@/nodes/mixins/ParentNode/algorithms/isAncestorOf';

/**
 * An inclusive ancestor is an object or one of its ancestors.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-inclusive-ancestor
 */
export type InclusiveAncestorOf<N extends Node = Node> =
	N | AncestorOf<N>;

/**
 * Checks whether a node is an inclusive ancestor of another node.
 *
 * @param ancestor - A node that may be an ancestor of `node`.
 * @param node - A node that may be an ancestor of `descendant`.
 * 
 * @returns The determination that `descendant` is a descendant of `node`.
 */
export const isInclusiveAncestorOf = <N extends Node = Node>(
	node: N,
	ancestor: Node,
): ancestor is AncestorOf<N> =>
	ancestor.isSameNode(node) || isAncestorOf(node, ancestor);

export default isInclusiveAncestorOf;
