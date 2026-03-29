import isShadowIncludingAncestorOf from '../isShadowIncludingAncestorOf';

/**
 * Checks whether a given node is a shadow-including inclusive ancestor of
 * another node.
 *
 * @see https://dom.spec.whatwg.org/#concept-shadow-including-inclusive-ancestor
 *
 * @param node - The node to check.
 * @param otherNode - The node that may be a shadow-including descendant of `node`.
 *
 * @returns A boolean which is `true` if `node` is a shadow-including inclusive
 * ancestor of `otherNode`.
 */
export const isShadowIncludingInclusiveAncestorOf = (
	node: Node,
	otherNode: Node,
) =>
	node.isSameNode(otherNode) ||
	isShadowIncludingAncestorOf(node, otherNode);

export default isShadowIncludingInclusiveAncestorOf;
