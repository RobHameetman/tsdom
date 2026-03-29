import isShadowIncludingDescendantOf from '../isShadowIncludingDescendantOf';

/**
 * Checks whether a given node is a shadow-including inclusive descendant of
 * another node.
 *
 * @see https://dom.spec.whatwg.org/#concept-shadow-including-inclusive-descendant
 *
 * @param node - The node to check.
 * @param otherNode - The node that may be a shadow-including descendant of `node`.
 *
 * @returns A boolean which is `true` if `node` is a shadow-including inclusive
 * descendant of `otherNode`.
 */
export const isShadowIncludingInclusiveDescendantOf = (
	node: Node,
	otherNode: Node,
): boolean => {
	return node.isSameNode(otherNode) || isShadowIncludingDescendantOf(node, otherNode);
};

export default isShadowIncludingInclusiveDescendantOf;
