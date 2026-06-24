import { isShadowRoot } from '#webcomponents/ShadowRoot';
import isDescendantOf from '#nodes/mixins/ChildNode/algorithms/isDescendantOf';
import isShadowIncludingInclusiveDescendantOf from '#webcomponents/ShadowRoot/algorithms/isShadowIncludingInclusiveDescendantOf';

/**
 * Checks whether a given node is a shadow-including descendant of another node.
 *
 * @see https://dom.spec.whatwg.org/#concept-shadow-including-descendant
 *
 * @param node - The node to check.
 * @param otherNode - The node that may be a shadow-including ancestor of `node`.
 *
 * @returns A boolean which is `true` if `node` is a shadow-including descendant
 * of `otherNode`.
 */
export const isShadowIncludingDescendantOf = (
	node: Node,
	otherNode: Node,
) => {
	if (isDescendantOf(node, otherNode)) {
		return true;
	}

	const root = node.getRootNode();

	return isShadowRoot(root) && isShadowIncludingInclusiveDescendantOf(root.host, otherNode);
};

export default isShadowIncludingDescendantOf;
