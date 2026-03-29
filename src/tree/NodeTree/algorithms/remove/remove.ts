import OrderedSet from '@/infra/OrderedSet';
import { rootOf, removeParentOf, inclusiveAncestorsOf } from '@/tree/Tree/relationships/parents';
import { shadowIncludingDescendantsOf } from '@/tree/ShadowTree/relationships/shadowRoots';
import { removeSiblingOf } from '@/tree/Tree/relationships/siblings';
import { inclusiveDescendantsOf, removeChildOf } from '@/tree/Tree/relationships/children';
import { isSlot } from '@/public/HTMLSlotElement';
import { assignedNodesIsEmptyFor } from '@/public/HTMLSlotElement/associations/assignedNodes';
import assignSlottables from '@/public/HTMLSlotElement/algorithms/assignSlottables';
import signalASlotChange from '@/public/HTMLSlotElement/algorithms/signalASlotChange';
import assignSlottablesForTreeOf from '@/public/HTMLSlotElement/algorithms/assignSlottablesForTreeOf';
import queueATreeMutationRecord from '@/public/MutationRecord/algorithms/queueATreeMutationRecord';
import { isAssignedSlottable } from '@/nodes/mixins/Slottable';
import { registeredObserverList } from '@/public/Node/associations';
import liveRangePreremoveSteps from '@/ranges/Range/algorithms/liveRangePreremoveSteps';
import { isShadowRoot } from '@/webcomponents/ShadowRoot';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-remove
 */
export const remove = (node: Node & Slottable, suppressObservers = false) => {
	const parent = node.parentNode as ParentNode;

	liveRangePreremoveSteps(node);

	/**
	 * For each NodeIterator object iterator whose root’s node document is node’s
	 * node document: run the NodeIterator pre-remove steps given node and iterator.
	 */

	const oldPreviousSibling = node.previousSibling;
	const oldNextSibling = node.nextSibling;

	if (parent.childElementCount === 1) {
		removeChildOf(parent);
	}

	removeParentOf(node);
	removeSiblingOf(node);

	if (isAssignedSlottable(node)) {
		assignSlottables(node.assignedSlot);
	}

	if (isShadowRoot(rootOf(node)) && isSlot(parent) && assignedNodesIsEmptyFor(parent)) {
		signalASlotChange(parent);
	}

	if (inclusiveDescendantsOf(node).some(isSlot)) {
		assignSlottablesForTreeOf(rootOf(parent));
		assignSlottablesForTreeOf(node as HTMLSlotElement);
	}

	/**
	 * Run the removing steps with node and parent.
	 * @see https://dom.spec.whatwg.org/#concept-node-remove-ext
	 */

	let isParentConnected = parent.isConnected;

	if (isCustom(node) && isParentConnected) {
		/**
		 * enqueue a custom element callback reaction with node, callback name
		 * "disconnectedCallback", and « » (an empty List).
		 */
	}

	shadowIncludingDescendantsOf(node).forEach((descendant) => {
		/**
		 * Run the removing steps with descendant and null.
		 * @see https://dom.spec.whatwg.org/#concept-node-remove-ext
		 */

		if (isCustom(descendant) && isParentConnected) {
			/**
			 * enqueue a custom element callback reaction with descendant, callback
			 * name "disconnectedCallback", and « » (an empty List).
			 */
		}
	});

	inclusiveAncestorsOf(parent).forEach((inclusiveAncestor) => {
		const registeredObservers = registeredObserverList.get(inclusiveAncestor);

		registeredObservers?.forEach((registered) => {
			if (registered.options.subtree) {
				registeredObservers.append({
					...registered,
					source: registered,
				});
			}
		});
	});

	if (!suppressObservers) {
		/**
		 * queue a tree mutation record for parent with « », « node »,
		 * oldPreviousSibling, and oldNextSibling.
		 */
		queueATreeMutationRecord(
			parent,
			OrderedSet.of<Node>(),
			OrderedSet.of<Node>(node),
			oldNextSibling,
			oldPreviousSibling,
		);
	}

	/**
	 * Run the children changed steps for parent.
	 * @see https://dom.spec.whatwg.org/#concept-node-children-changed-ext
	 */
};

export default remove;
