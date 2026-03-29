import isRootNode from '@/nodes/tree/Node/algorithms/isRootNode';
import { isChildNode } from '@/nodes/mixins/ChildNode';
import type { SiblingOf } from '@/nodes/mixins/ChildNode/algorithms/isSiblingOf';

/**
 * An inclusive sibling is an object or one of its siblings.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-inclusive-sibling
 */
export type InclusiveSiblingOf<N extends ChildNode = ChildNode> =
	N | SiblingOf<N>;

/**
 * Checks if a given `node` is an inclusive sibling of a given `sibling`.
 */
export const isInclusiveSiblingOf = <N extends ChildNode = ChildNode>(
	node: Node,
	sibling: N,
): node is InclusiveSiblingOf<N> => {
	return Boolean(sibling.parentNode?.isSameNode(node.parentNode));
};

export default isInclusiveSiblingOf;
