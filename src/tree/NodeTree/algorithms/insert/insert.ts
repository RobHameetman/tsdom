import Tree from '#tree/Tree';
import remove from '#tree/NodeTree/algorithms/remove';
// import { OrderedSet } from '#_internals/infra/OrderedSet';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-insert
 */
export const insert = (node: Node, parent: ParentNode, child: ChildNode | null = null, suppressObservers = false): void | never => {
	const nodes = node instanceof DocumentFragment ? node.childNodes : [node];
	const count = nodes.length;

	if (!count) {
		return;
	}

	if (node instanceof DocumentFragment) {
		remove(...nodes, true);

		/**
		 * Queue a tree mutation record for node with « », nodes, null, and null.
		 */
	}

	if (child !== null) {
		/**
		 * For each live range whose start node is parent and start offset is
		 * greater than child’s index: increase its start offset by count.
		 */

		/**
		 * For each live range whose end node is parent and end offset is greater
		 * than child’s index: increase its end offset by count.
		 */
	}

	const previousSibling = child?.previousSibling || null;

	for (const node of nodes) {
		//
	}
};

export default insert;
