import isRootNode from '#nodes/tree/Node/algorithms/isRootNode';
import { isChildNode } from '#nodes/mixins/ChildNode';
import isParentOf from '#nodes/mixins/ParentNode/algorithms/isParentOf';

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
interface FirstChildOf<P extends ParentNode = ParentNode> extends ChildNode {
	readonly parentNode: P;
	readonly previousSibling: null;
}

/**
 * Checks if a given `node` is the first child of a given `parent`.
 */
export const isFirstChildOf = <P extends ParentNode = ParentNode>(
	parent: P,
	node: Node,
): node is FirstChildOf<P> =>
	isChildNode(node) &&
	isParentOf(node, parent) &&
	node.previousSibling === null;

export default isFirstChildOf;
