import { isType } from '@com.robhameetman/utils';
import OrderedSet from '@/infra/OrderedSet';
import Stack from '@/infra/Stack';
import { attach, detach, hostIncludingAncestorsOf, hostIncludingDescendantsOf, hostIncludingInclusiveAncestorsOf, hostIncludingInclusiveDescendantsOf, hostOf, hostedBy, isHost, isHostIncludingAncestorOf, isHostIncludingDescendantOf, isHostIncludingInclusiveAncestorOf, isHostIncludingInclusiveDescendantOf } from '@/tree/Tree/relationships/hosts';
import { append, childrenOf, descendantsOf, firstChildOf, hasChildren, inclusiveDescendantsOf, indexOf, isDescendantOf, isFirstChildOf, isInclusiveDescendantOf, isLastChildOf, lastChildOf, prepend, remove, replace } from '@/tree/Tree/relationships/children';
import { after, before, followingSiblingsOf, isNextSiblingOf, isPreviousSiblingOf, isSiblingOf, nextSiblingOf, precedingSiblingsOf, previousSiblingOf, siblingsOf } from '@/tree/Tree/relationships/siblings';
import { ancestorsOf, inclusiveAncestorsOf, isAncestorOf, isInclusiveAncestorOf, parentOf } from '@/tree/Tree/relationships/parents';
import { rootOf } from '@/tree/Tree/relationships/roots';

/**
 * A tree is a collection of objects that are related to each other in a
 * hierarchical manner. Each object in a tree is called a node, and each node
 * may have one or more child nodes.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree
 *
 * @typeParam `T` - The type of the nodes in the tree.
 * @typeParam `R` - The type of the root node in the tree.
 * @typeParam `H` - The type of the host node in the tree.
 */
export interface Tree<T extends object = object, R extends T = T, H extends T = T> {
	/* Relatives */
	parentOf<N extends T = T, P extends T = T>(node: N): P | null;
	firstChildOf<N extends T = T, C extends T = T>(node: N): C | null;
	lastChildOf<N extends T = T, C extends T = T>(node: N): C | null;
	nextSiblingOf<N extends T = T, S extends T = T>(node: N): S | null;
	previousSiblingOf<N extends T = T, S extends T = T>(node: N): S | null;

	/* Order */
	compareTreeOrder<N extends T = T>(node: N, other: N, composed?: boolean): number;
	hasChildren<N extends T = T>(node: N): boolean;
	follows<N extends T = T>(node: N, predicate: (node: N) => boolean, composed?: boolean): boolean;
	follows<N extends T = T>(node: N, other: N, composed?: boolean): boolean;
	indexOf<N extends T = T>(node: N): number;
	isAncestorOf<N extends T = T>(node: N, other: N): boolean;
	isDescendantOf<N extends T = T>(node: N, other: N): boolean;
	isFirstChildOf<N extends T = T>(node: N, other: N): boolean;
	isHostIncludingAncestorOf<N extends T = T>(node: N, other: N): boolean;
	isHostIncludingDescendantOf<N extends T = T>(node: N, other: N): boolean;
	isHostIncludingInclusiveAncestorOf<N extends T = T>(node: N, other: N): boolean;
	isHostIncludingInclusiveDescendantOf<N extends T = T>(node: N, other: N): boolean;
	isInclusiveAncestorOf<N extends T = T>(node: N, other: N): boolean;
	isInclusiveDescendantOf<N extends T = T>(node: N, other: N): boolean;
	isLastChildOf<N extends T = T>(node: N, other: N): boolean;
	isNextSiblingOf<N extends T = T>(node: N, other: N): boolean;
	isPreviousSiblingOf<N extends T = T>(node: N, other: N): boolean;
	isSiblingOf<N extends T = T>(node: N, other: N): boolean;
	precedes<N extends T = T>(node: N, predicate: (node: N) => boolean, composed?: boolean): boolean;
	precedes<N extends T = T>(node: N, other: N, composed?: boolean): boolean;

	/* Mutations */
	after<N extends T = T>(node: N, ...nodes: ReadonlyArray<N>): this;
	append<N extends T = T>(node: N, ...nodes: ReadonlyArray<N>): this;
	attach(node: H): this;
	before<N extends T = T>(node: N, ...nodes: ReadonlyArray<N>): this;
	clone<N extends T = T, C extends T = T>(node: N, deep?: boolean): Tree<C>;
	detach(): this;
	prepend<N extends T = T>(node: N, ...nodes: ReadonlyArray<N>): this;
	replace<N extends T = T>(node: N, ...nodes: ReadonlyArray<N>): this;
	remove<N extends T = T>(node: N): this;

	/* Subtree */
	ancestorsOf<N extends T = T, A extends T = T>(node: N): OrderedSet<A>;
	childrenOf<N extends T = T, C extends T = T>(node: N): OrderedSet<C>;
	descendantsOf<N extends T = T, D extends T = T>(node: N): OrderedSet<D>;
	following<N extends T = T>(node: N): OrderedSet<N>;
	followingSiblingsOf<N extends T = T, S extends T = T>(node: N): OrderedSet<S>;
	hostIncludingAncestorsOf<N extends T = T, A extends T = T>(node: N): OrderedSet<N | A>;
	hostIncludingDescendantsOf<N extends T = T, D extends T = T>(node: N): OrderedSet<N | D>;
	hostIncludingInclusiveAncestorsOf<N extends T = T, A extends T = T>(node: N): OrderedSet<N | A>;
	hostIncludingInclusiveDescendantsOf<N extends T = T, D extends T = T>(node: N): OrderedSet<N | D>;
	inclusiveAncestorsOf<N extends T = T, A extends T = T>(node: N): OrderedSet<N | A>;
	inclusiveDescendantsOf<N extends T = T, D extends T = T>(node: N): OrderedSet<N | D>;
	preceding<N extends T = T>(node: N): OrderedSet<N>;
	precedingSiblingsOf<N extends T = T, S extends T = T>(node: N): OrderedSet<S>;
	siblingsOf<N extends T = T, S extends T = T>(node: N): OrderedSet<S>;

	/* Traversal */
	composed<N extends T = T>(): Generator<N, void, unknown>;
	[Symbol.iterator]<N extends T = T>(): Generator<N, void, unknown>;
}

export const Tree = Object.seal(Object.create(Object.prototype, {
	/* Relatives */
	parentOf: {
		value<N extends object = object, P extends N = N>(node: N) {
			return parentOf<N, P>(node) || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	firstChildOf: {
		value<N extends object = object, C extends N = N>(node: N) {
			return firstChildOf<N, C>(node) || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	lastChildOf: {
		value<N extends object = object, C extends N = N>(node: N) {
			return lastChildOf<N, C>(node) || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	nextSiblingOf: {
		value<N extends object = object, S extends N = N>(node: N) {
			return nextSiblingOf<N, S>(node) || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	previousSiblingOf: {
		value<N extends object = object, S extends N = N>(node: N) {
			return previousSiblingOf<N, S>(node) || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},

	/* Tree Order */
	compareTreeOrder: {
		value<N extends object = object>(node: N, other: N, composed = false) {
			if (node === other) {
				return 0;
			}

			const firstAncestors = composed
				? hostIncludingAncestorsOf(node).toReversed()
				: ancestorsOf(node).toReversed();

			const secondAncestors = composed
				? hostIncludingAncestorsOf(other).toReversed()
				: ancestorsOf(other).toReversed();

			const depth = Math.min(firstAncestors.length, secondAncestors.length);

			let commonAncestor = 0;

			while (commonAncestor < depth && firstAncestors[commonAncestor] === secondAncestors[commonAncestor]) {
				commonAncestor++;
			}

			if (commonAncestor === depth) {
				return firstAncestors.length < secondAncestors.length
					? -1
					: 1;
			}

			const firstIndex = indexOf(firstAncestors[commonAncestor]);
			const secondIndex = indexOf(secondAncestors[commonAncestor]);

			return firstIndex < secondIndex
				? -1
				: 1;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	hasChildren: {
		value<T extends object = object>(node: T) {
			return hasChildren(node);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	follows: {
		value<N extends object = object>(node: N, other: N | ((node: N) => boolean), composed = false) {
			if (other instanceof Function) {
				return this.following(node).some(other);
			}

			return this.compareTreeOrder(node as N, other, composed) > 0;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	indexOf: {
		value: indexOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isAncestorOf: {
		value: isAncestorOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isDescendantOf: {
		value: isDescendantOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isFirstChildOf: {
		value: isFirstChildOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isHostIncludingAncestorOf: {
		value: isHostIncludingAncestorOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isHostIncludingDescendantOf: {
		value: isHostIncludingDescendantOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isHostIncludingInclusiveAncestorOf: {
		value: isHostIncludingInclusiveAncestorOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isHostIncludingInclusiveDescendantOf: {
		value: isHostIncludingInclusiveDescendantOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isInclusiveAncestorOf: {
		value: isInclusiveAncestorOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isInclusiveDescendantOf: {
		value: isInclusiveDescendantOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isLastChildOf: {
		value: isLastChildOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isNextSiblingOf: {
		value: isNextSiblingOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isPreviousSiblingOf: {
		value: isPreviousSiblingOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isSiblingOf: {
		value: isSiblingOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	precedes: {
		value<N extends object = object>(node: N, other: N | ((node: N) => boolean), composed = false) {
			if (other instanceof Function) {
				return this.preceding(node).some(other);
			}

			return this.compareTreeOrder(node, other, composed) < 0;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},

	/* Mutations */
	after: {
		value<N extends object = object, S extends N = N>(node: N, ...nodes: ReadonlyArray<S>) {
			after(node, ...nodes);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	append: {
		value<N extends object = object, C extends N = N>(node: N, ...nodes: ReadonlyArray<C>) {
			append(node, ...nodes);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	attach: {
		value<N extends object = object, R extends N = N, H extends N = N>(this: Tree<N, R, H>, node: H) {
			attach(this.root, node);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	before: {
		value<N extends object = object, S extends N = N>(node: N, ...nodes: ReadonlyArray<S>) {
			before(node, ...nodes);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	clone: {
		value<N extends object = object, C extends N = N>(node: N, deep = false) {
			const clone = new Tree<N, C>(structuredClone(node) as C);

			if (!deep || !hasChildren(node)) {
				return clone;
			}

			for (const child of childrenOf(node)) {
				const childClone = this.clone(child, true);

				clone.append(clone.root, childClone.root);
			}

			return clone;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	detach: {
		value<N extends object = object, R extends N = N, H extends N = N>(this: Tree<N, R, H>) {
			detach(this.root);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	prepend: {
		value<N extends object = object, C extends N = N>(node: N, ...nodes: ReadonlyArray<C>) {
			prepend(node, ...nodes);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	replace: {
		value<N extends object = object>(node: N, ...nodes: ReadonlyArray<N>) {
			replace(node, ...nodes);

			return this;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	remove: {
		value<N extends object = object>(node: N) {
			remove(node);

			return new Tree<N, N>(node);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},

	/* Traversal */
	ancestorsOf: {
		value: ancestorsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	childrenOf: {
		value: childrenOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	descendantsOf: {
		value: descendantsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	following: {
		value<N extends object = object>(node: N) {
			const nodes = new OrderedSet<N>();
			let following = false;

			for (const currentNode of this) {
				if (following) {
					nodes.append(currentNode);
				}

				if (!following) {
					following = currentNode === node;
				}
			}

			return nodes;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	followingSiblingsOf: {
		value: followingSiblingsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	hostIncludingAncestorsOf: {
		value: hostIncludingAncestorsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	hostIncludingDescendantsOf: {
		value: hostIncludingDescendantsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	hostIncludingInclusiveAncestorsOf: {
		value: hostIncludingInclusiveAncestorsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	hostIncludingInclusiveDescendantsOf: {
		value: hostIncludingInclusiveDescendantsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	inclusiveAncestorsOf: {
		value: inclusiveAncestorsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	inclusiveDescendantsOf: {
		value: inclusiveDescendantsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	preceding: {
		*value<N extends object = object>(node: N) {
			const nodes = new OrderedSet<N>();

			for (const currentNode of this) {
				if (currentNode !== node) {
					nodes.append(currentNode);
				} else {
					break;
				}
			}

			return nodes;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	precedingSiblingsOf: {
		value: precedingSiblingsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	siblingsOf: {
		value: siblingsOf,
		configurable: true,
		enumerable: true,
		writable: true,
	},
	composed: {
		*value<N extends object = object>(this: Tree<N>) {
			const stack = new Stack<N>(this.root);

			while (stack.length > 0) {
				const currentNode = stack.pop() as N;

				yield currentNode;

				stack.push(
					...Array.from(childrenOf<N, N>(currentNode)).reverse(),
				);

				if (isHost(currentNode)) {
					stack.push(hostedBy<N, N>(currentNode) as N);
				}
			}
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
}));

/**
 * Checks that an `unknown` value is a {@link Tree} structure.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Tree`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Tree} structure.
 */
export const isTree = (value: unknown): value is Tree =>
	value instanceof Tree;

Object.seal(Tree);

export default Tree;
