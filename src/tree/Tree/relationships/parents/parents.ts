import OrderedSet from '@/infra/OrderedSet';
import { treeOrderHasChangedFor } from '@/tree/Tree/traversal/order';

/**
 * An object A whose child is object B is a parent of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-parent
 */
export const parents = new WeakMap<object, object>();

export const ancestorsOf = <
	N extends object = object
>(node: N) => {
	const ancestors = new OrderedSet<N>();
	let parent = parentOf(node);

	while (parent) {
		ancestors.append(parent);
		parent = parentOf(parent);
	}

	return ancestors;
};

export const hasParent = <
	N extends object = object
>(node: N) => {
	return parents.has(node);
};

export const inclusiveAncestorsOf = <
	N extends object = object,
>(node: N) => {
	return ancestorsOf(node).prepend(node);
};

export const isAncestorOf = <
	N extends object = object,
>(node: N, other: N) => {
	return ancestorsOf(node).contains(other);
};

export const isInclusiveAncestorOf = <
	N extends object = object,
>(node: N, other: N) => {
	return ancestorsOf(node).contains(other);
};

export const isParentOf = <
	N extends object = object,
	P extends N = N,
>(node: N, other: N | P): other is P => {
	return parentOf(node) === other;
};

export const isRoot = <
	N extends object = object
>(node: N) => {
	return parentOf(node) === undefined;
};

export const isRootOf = <
	N extends object = object,
	R extends N = N,
>(node: N): node is R => {
	return rootOf(node) === node;
};

export const parentOf = <
	N extends object = object,
	P extends N = N
>(node: N) => {
	return parents.get(node) as P | undefined;
};

export const rootOf = <
	N extends object = object,
	R extends N = N,
>(node: N) => {
	let parent = parentOf<N, N | R>(node);
	let root = node as R;

	if (!parent) {
		return root;
	}

	while (parent) {
		root = parent as R;
		parent = parentOf(parent);
	}

	return root;
};

export const removeParentOf = <
	N extends object = object
>(node: N) => {
	treeOrderHasChangedFor(rootOf(node));
	parents.delete(node);
};

export const setAsParent = <
	N extends object = object,
	P extends N = N
>(parent: P, ...nodes: ReadonlyArray<N>) => {
	nodes.forEach((node) => {
		parents.set(node, parent);
	});

	treeOrderHasChangedFor(rootOf(parent));
};

export default parents;
