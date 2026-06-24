import List from '#infra/List';
import insert from '../insert';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-replace-all
 */
export const replaceAll = (node: Node | null, parent: ParentNode) => {
	const removedNodes = List.from(parent.childNodes);
	let addedNodes = List.of<Node>();

	if (node instanceof DocumentFragment) {
		addedNodes = List.from(node.childNodes);
	} else if (node !== null) {
		addedNodes = List.of(node);
	}

	remove(...removedNodes, true);

	if (node !== null) {
		insert(node, parent, null, true);
	}

	if (addedNodes.length > 0 || removedNodes.length > 0) {
		/**
		 * queue a tree mutation record for parent with addedNodes, removedNodes, null, and null.
		 */
	}
};

export default replaceAll;
