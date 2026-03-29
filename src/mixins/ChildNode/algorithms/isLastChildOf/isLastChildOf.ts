import { isChildNode } from '@/nodes/mixins/ChildNode';
import isParentOf from '@/nodes/mixins/ParentNode/algorithms/isParentOf';

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
interface LastChildOf<P extends ParentNode = ParentNode> extends ChildNode {
	readonly parentNode: P;
	readonly nextSibling: null;
}

/**
 * Checks if a given `node` is the last child of a given `parent`.
 */
export const isLastChildOf = <P extends ParentNode = ParentNode>(
	parent: P,
	node: Node,
): node is LastChildOf<P> =>
	isChildNode(node) &&
	isParentOf(node, parent) &&
	node.nextSibling === null;

export default isLastChildOf;
