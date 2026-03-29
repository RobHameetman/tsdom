import { isType } from '@com.robhameetman/utils';
import Tree from '@/tree/Tree';

/**
 * Nodes are objects that implement {@link Node}. Nodes participate in a tree,
 * which is known as the {@link NodeTree}.
 *
 * @see https://dom.spec.whatwg.org/#concept-node-tree
 *
 * @privateRemarks
 * This should be an interface but extending {@link Tree} in this case causes
 * the compiler to complain that the methods aren't correctly implemented and
 * there's no other way to resolve it without {@link Tree} knowing about its
 * node types.
 */
export type NodeTree<R extends Node = Node, H extends Node = Node> = Tree<Node, R, H>;

export const NodeTree = Object.seal(Object.create(Tree, {
	/* Mutations */
	after: {
		value<R extends Node = Node, H extends Node = Node>(this: NodeTree<R, H>, node: Node, ...nodes: ReadonlyArray<Node>) {
			validateInsertion(this, this.parentOf(node) as Node, this.nextSiblingOf(node), nodes);

			Tree.prototype.after.call(this, node, ...nodes);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	append: {
		value<R extends Node = Node, H extends Node = Node>(this: NodeTree<R, H>, node: Node, ...nodes: ReadonlyArray<Node>) {
			validateInsertion(this, this.parentOf(node) as Node, null, nodes);

			Tree.prototype.append.call(this, node, ...nodes);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	before: {
		value<R extends Node = Node, H extends Node = Node>(this: NodeTree<R, H>, node: Node, ...nodes: ReadonlyArray<Node>) {
			validateInsertion(this, this.parentOf(node) as Node, node, nodes);

			Tree.prototype.before.call(this, node, ...nodes);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	prepend: {
		value<R extends Node = Node, H extends Node = Node>(this: NodeTree<R, H>, parent: Node, ...nodes: ReadonlyArray<H>) {
			validateInsertion(this, parent, this.firstChildOf(parent), nodes);

			Tree.prototype.prepend.call(this, parent, ...nodes);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	replace: {
		value<R extends Node = Node, H extends Node = Node>(this: NodeTree<R, H>, node: Node, ...nodes: ReadonlyArray<Node>) {
			validateInsertion(this, this.parentOf(node) as Node, node, nodes);

			Tree.prototype.replace.call(this, node, ...nodes);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
}));

/**
 * Checks that an `unknown` value is a {@link NodeTree} structure.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Tree`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeTree} structure.
 */
export const isNodeTree = (value: unknown): value is NodeTree =>
	value instanceof NodeTree;

Object.freeze(NodeTree);

export default NodeTree;
