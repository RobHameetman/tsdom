import isRootNode from '@/nodes/tree/Node/algorithms/isRootNode';
import { isChildNode } from '@/nodes/mixins/ChildNode';

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
export interface ChildOf<P extends Node = Node> extends ChildNode {
	readonly parentNode: P & ParentNode;
}

/**
 * Checks if a given `node` is a child of a given `parent`.
 */
export const isChildOf = <P extends Node = Node>(
	node: Node,
	parent: P,
): node is ChildOf<P> => {
	if (isChildNode(node) && !isRootNode(node)) {
		return parent.isSameNode(node.parentNode);
	}

	return false;
};

export default isChildOf;
