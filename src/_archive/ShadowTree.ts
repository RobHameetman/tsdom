import { isType } from '@com.robhameetman/utils';
import Tree from '@/tree/Tree';
import NodeTree from '@/tree/NodeTree';
import { hasShadowRoot, isShadowIncludingAncestorOf, isShadowIncludingDescendantOf, isShadowIncludingInclusiveAncestorOf, isShadowIncludingInclusiveDescendantOf, shadowIncludingAncestorsOf, shadowIncludingDescendantsOf, shadowIncludingInclusiveAncestorsOf, shadowIncludingInclusiveDescendantsOf, shadowIncludingRootOf, shadowRootOf } from '@/tree/ShadowTree/relationships/shadowRoots';

export interface ShadowTree<H extends Node = Node> extends NodeTree<ShadowRoot, H> {
	shadowIncludingRootOf<N extends Node | ShadowRoot = Node | ShadowRoot, R extends Exclude<N, ShadowRoot> = Exclude<N, ShadowRoot>, H extends N = N>(node: N): R;

	/* Order */
	isShadowIncludingAncestorOf<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(node: N, other: A): boolean;
	isShadowIncludingDescendantOf<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(node: N, other: D): boolean;
	isShadowIncludingInclusiveAncestorOf<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(node: N, other: A): boolean;
	isShadowIncludingInclusiveDescendantOf<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(node: N, other: D): boolean;

	/* Traversal */
	shadowIncludingAncestorsOf<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(node: N): Generator<A, void, unknown>;
	shadowIncludingDescendantsOf<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(node: N): Generator<D, void, unknown>;
	shadowIncludingInclusiveAncestorsOf<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(node: N): Generator<A, void, unknown>;
	shadowIncludingInclusiveDescendantsOf<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(node: N): Generator<D, void, unknown>;
}

export const ShadowTree = Object.seal(Object.create(NodeTree, {
	shadowIncludingRootOf: {
		value<
			N extends Node | ShadowRoot = Node | ShadowRoot,
			R extends Exclude<N, ShadowRoot> = Exclude<N, ShadowRoot>,
			H extends N = N
		>(this: ShadowTree<H>, node: N) {
			return shadowIncludingRootOf<N, R, H>(node);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isShadowIncludingAncestorOf: {
		value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: ShadowTree, node: N, other: N) {
			return isShadowIncludingAncestorOf<N, A>(node, other);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isShadowIncludingDescendantOf: {
		value<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(this: ShadowTree, node: N, other: N) {
			return isShadowIncludingDescendantOf<N, D>(node, other);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isShadowIncludingInclusiveAncestorOf: {
		value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: ShadowTree, node: N, other: N) {
			return isShadowIncludingInclusiveAncestorOf<N, A>(node, other);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	isShadowIncludingInclusiveDescendantOf: {
		value<N extends Node | ShadowRoot = Node | ShadowRoot, D extends N = N>(this: ShadowTree, node: N, other: N) {
			return isShadowIncludingInclusiveDescendantOf<N, D>(node, other);
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	shadowIncludingAncestorsOf: {
		*value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: ShadowTree, node: N) {
			for (const ancestor of shadowIncludingAncestorsOf<N, A>(node)) {
				yield ancestor;
			}
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	shadowIncludingDescendantsOf: {
		*value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: Tree<N>, node: N) {
			for (const ancestor of shadowIncludingDescendantsOf<N, A>(node)) {
				yield ancestor;
			}
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	shadowIncludingInclusiveAncestorsOf: {
		*value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: ShadowTree, node: N) {
			for (const ancestor of shadowIncludingInclusiveAncestorsOf<N, A>(node)) {
				yield ancestor;
			}
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	shadowIncludingInclusiveDescendantsOf: {
		*value<N extends Node | ShadowRoot = Node | ShadowRoot, A extends N = N>(this: Tree<N>, node: N) {
			for (const ancestor of shadowIncludingInclusiveDescendantsOf<N, A>(node)) {
				yield ancestor;
			}
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	constructor: {
		value: ShadowTree,
		configurable: true,
		writable: true,
	},
	[Symbol.toStringTag]: {
		value: 'ShadowTree',
		configurable: true,
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
export const isShadowTree = <H extends Node = Node>(value: unknown): value is ShadowTree<H> =>
	value instanceof ShadowTree;

Object.seal(ShadowTree);

export default ShadowTree;
