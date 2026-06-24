import { isShadowRoot } from '#webcomponents/ShadowRoot';
import isShadowIncludingInclusiveAncestorOf from '../isShadowIncludingInclusiveAncestorOf';

/**
 * Checks whether a node is closed-shadow-hidden from another node. This means
 * that the node is inside a closed shadow tree, and the other node is not a
 * descendant of the shadow host.
 *
 * @see https://dom.spec.whatwg.org/#concept-closed-shadow-hidden
 *
 * @param node - The node to check.
 * @param otherNode - The node that may be hiding `node`.
 *
 * @returns A boolean which is `true` if `node` is closed-shadow-hidden from
 * `otherNode`.
 */
export const isClosedShadowHidden = (
	node: Node,
	otherNode: Node,
): boolean => {
	const root = node.getRootNode();

	return isShadowRoot(root) &&
		!isShadowIncludingInclusiveAncestorOf(otherNode, root) &&
		(root.mode === 'closed' || isClosedShadowHidden(root.host, otherNode));
};

export default isClosedShadowHidden;
