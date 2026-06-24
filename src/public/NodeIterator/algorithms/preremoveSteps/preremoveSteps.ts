import { isInclusiveAncestorOf } from '#tree/Tree/relationships/parents';
import { lastInclusiveDescendantOf } from '#tree/Tree/relationships/children';
import { pointerBeforeReferenceOf, setPointerBeforeReferenceToFalseFor } from '#public/NodeIterator/associations/pointerBeforeReference';
import { setReferenceOf } from '#public/NodeIterator/associations/reference';
import { isNodeIteratorsRoot } from '#public/NodeIterator/associations/root';

/**
 * @see https://dom.spec.whatwg.org/#live-range-pre-remove-steps
 *
 * @param nodeIterator - A {@link NodeIterator} instance.
 * @param toBeRemovedNode - A {@link Node} to be removed.
 */
export const preremoveSteps = (nodeIterator: NodeIterator, toBeRemovedNode: Node) => {
	if (
		!isInclusiveAncestorOf(nodeIterator.referenceNode, toBeRemovedNode) ||
		isNodeIteratorsRoot(nodeIterator, toBeRemovedNode)
	) {
		return;
	}

	if (pointerBeforeReferenceOf(nodeIterator)) {

		/**
		 * Let next be toBeRemovedNode’s first following node that is an inclusive
		 * descendant of nodeIterator’s root and is not an inclusive descendant of
		 * toBeRemovedNode, if there is such a node; otherwise null.
		*/
		const next = null;

		if (next !== null) {
			setReferenceOf(nodeIterator, next);

			return;
		}

		setPointerBeforeReferenceToFalseFor(nodeIterator);
	}

	setReferenceOf(
		nodeIterator,
		(toBeRemovedNode.previousSibling === null
			? toBeRemovedNode.parentNode
			: lastInclusiveDescendantOf(toBeRemovedNode)) as Node
	);
};

export default preremoveSteps;
