import isShadowIncludingDescendantOf from '@/webcomponents/ShadowRoot/algorithms/isShadowIncludingDescendantOf';

/**
 * Checks whether a node is a shadow-including ancestor of another node.
 *
 * @see https://dom.spec.whatwg.org/#concept-shadow-including-ancestor
 *
 * @param node - The node to check.
 * @param otherNode - The node that may be a shadow-including descendant of `node`.
 * 
 * @returns A boolean which is `true` if `node` is a shadow-including
 * ancestor of `otherNode`.
 */
export const isShadowIncludingAncestorOf = (
	node: Node,
	otherNode: Node,
) => {
	return isShadowIncludingDescendantOf(otherNode, node);
};

export default isShadowIncludingAncestorOf;
