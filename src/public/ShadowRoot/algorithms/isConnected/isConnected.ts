import { shadowIncludingRootOf } from '@/tree/ShadowTree/relationships/shadowRoots';

/**
 * Checks if a node is connected to the document.
 *
 * @see https://dom.spec.whatwg.org/#connected
 *
 * @param node - The node to check.
 *
 * @returns A boolean which is `true` if the node is connected to the document,
 * `false` otherwise.
 */
export const isConnected = (node: Node) =>
	shadowIncludingRootOf(node) instanceof Document;

export default isConnected;
