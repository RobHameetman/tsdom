import preinsert from '@/tree/NodeTree/algorithms/preinsert';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-append
 */
export const append = (node: Node, parent: ParentNode) => {
	preinsert(node, parent, null);
};

export default append;
