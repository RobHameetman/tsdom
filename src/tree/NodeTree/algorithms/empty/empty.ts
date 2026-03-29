import length from '@/tree/NodeTree/algorithms/length';

/**
 * Checks if a node's {@link length()} is 0.
 *
 * @see https://dom.spec.whatwg.org/#concept-node-empty
 *
 * @param node - A node to check.
 *
 * @returns A boolean which is `true` if the node is empty, `false` otherwise.
 */
export const empty = (node: Node) =>
	length(node) === 0;

export default empty;
