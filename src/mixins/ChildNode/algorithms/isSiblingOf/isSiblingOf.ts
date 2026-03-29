/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
export interface SiblingOf<N extends ChildNode = ChildNode> extends ChildNode {
	readonly parentNode: N['parentNode'];
}

/**
 * Checks if a given `node` is a child of a given `parent`.
 */
export const isSiblingOf = <N extends ChildNode = ChildNode, P extends N['parentNode'] = N['parentNode']>(
	node: Node,
	sibling: N,
): node is SiblingOf<N> => {
	return Boolean(sibling.parentNode?.isSameNode(node.parentNode));
};

export default isSiblingOf;
