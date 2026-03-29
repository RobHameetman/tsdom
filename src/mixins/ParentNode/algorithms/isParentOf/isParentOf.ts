/**
 * An object A whose child is object B is a parent of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-parent
 */
export interface ParentOf<C extends Node = Node> extends ParentNode {
	readonly childNodes: NodeListOf<ChildNode | (C & ChildNode)>;
	hasChildNodes(): true;
}

/**
 * Checks if `node` is a parent of `child`.
 *
 * @param node 
 * @param child 
 * @returns 
 */
const isParentOf = <C extends Node = Node>(
	child: C,
	node: Node,
): node is ParentOf<C> => {
	if (node.hasChildNodes()) {
		return node.isSameNode(child.parentNode);
	}

	return false;
};

export default isParentOf;
