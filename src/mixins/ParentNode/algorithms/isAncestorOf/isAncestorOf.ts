import { isDescendantOf } from '@/nodes/mixins/ChildNode/algorithms/isDescendantOf';
import type { ChildOf } from '@/nodes/mixins/ChildNode/algorithms/isChildOf';
import { isParentNode } from '@/nodes/mixins/ParentNode';
import isParentOf from '@/nodes/mixins/ParentNode/algorithms/isParentOf';
import type { RootNode } from '@/nodes/tree/Node/algorithms/isRootNode/isRootNode';

export type AncestorOf<N extends Node = Node> =
	N extends RootNode
		? never
		: N extends ChildOf<infer P extends ParentNode & ChildNode>
			? N | AncestorOf<P>
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
export const isAncestorOf = <N extends Node = Node>(
	node: N,
	ancestor: Node,
): node is AncestorOf<N> => {
	if (!isParentNode(ancestor)) {
		return false;
	}

	if (isParentOf<N>(node, ancestor)) {
		return true;
	}

	return isDescendantOf(ancestor, node);
};

export default isAncestorOf;
