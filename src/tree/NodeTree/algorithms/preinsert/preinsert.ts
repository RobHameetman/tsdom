import Tree from '#tree/Tree';
import { ensurePreinsertValidity } from '#tree/NodeTree/algorithms/ensurePreinsertValidity';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-pre-insert
 */
export const preinsert = (node: Node, parent: ParentNode, child: ChildNode | null = null) => {
	ensurePreinsertValidity(node, parent, child);

	let referenceChild = child;

	if (referenceChild === node) {
		Tree.of(node).after(node, referenceChild);
	}

	return node;
};

export default preinsert;
