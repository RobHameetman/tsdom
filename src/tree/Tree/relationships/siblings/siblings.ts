import { OrderedSet } from '#infra/OrderedSet';
import { parentOf, rootOf, setAsParent } from '#tree/Tree/relationships/parents';
import { childrenOf, setChildOf } from '#tree/Tree/relationships/children';
import { treeOrderHasChangedFor } from '#tree/Tree/traversal/order';

export type Children<
	T extends object = object,
	U extends object = object
> = WeakMap<T, OrderedSet<U>>;

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
export const sibling = new WeakMap<object, object>();

// let currentParent: object | undefined;
// let currentChildren: OrderedSet<object> | undefined;

export const followingSiblingsOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	const siblings = inclusiveSiblingsOf<N, S>(node);
	const index = siblings.indexOf(node);

	return index >= 0
		? siblings.slice(index + 1)
		: new OrderedSet<S>();
};

export const hasNextSibling = <
	N extends object = object
>(node: N) => {
	return sibling.has(node);
};

export const hasPreviousSibling = <
	N extends object = object
>(node: N) => {
	return previousSiblingOf(node) !== undefined;
};

export const inclusiveSiblingsOf = <
	N extends object = object,
	S extends N = N,
>(node: N) => {
	const parent = parentOf(node);

	if (!parent) {
		return new OrderedSet<N | S>(node);
	}

	return childrenOf<N, N | S>(parent);
};

export const isFollowingSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N, other: N | S): other is S => {
	return followingSiblingsOf<N, S>(node).contains(other);
};

export const isNextSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N, other: N | S): other is S => {
	return nextSiblingOf(node) === other;
};

export const isPrecedingSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N, other: N | S): other is S => {
	return precedingSiblingsOf<N, S>(node).contains(other);
};

export const isPreviousSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N, other: N | S): other is S => {
	return previousSiblingOf(node) === other;
};

export const isSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N, other: N | S): other is S => {
	return siblingsOf(node).contains(other);
};

export const nextSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	return sibling.get(node) as S | undefined;
};

export const precedingSiblingsOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	const siblings = inclusiveSiblingsOf<N, S>(node);
	const index = siblings.indexOf(node);

	return index >= 0
		? siblings.slice(0, index)
		: new OrderedSet<S>();
};

export const previousSiblingOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	return precedingSiblingsOf<N, S>(node).at(-1) as S | undefined;
};

export const siblingsOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	return inclusiveSiblingsOf(node).difference(OrderedSet.of(node)) as OrderedSet<S>;
};

export const removeSiblingOf = <
	N extends object = object
>(node: N) => {
	sibling.delete(node);
	treeOrderHasChangedFor(rootOf(node));
};

export const setSiblingOf = <
	N extends object = object
>(node: N, nextSibling: N) => {
	sibling.set(node, nextSibling);
	treeOrderHasChangedFor(rootOf(node));
};

export const setSiblings = <
	N extends object = object,
	S extends N = N,
>(nodes: ReadonlyArray<S>) => {
	nodes.forEach((node, index) => {
		const nextSibling = nodes[index + 1];

		if (nextSibling) {
			setSiblingOf(node, nextSibling);
		}
	});
};

export const after = <
	N extends object = object,
	S extends N = N
>(node: N, ...nodes: ReadonlyArray<S>) => {
	const parent = parentOf(node);

	if (!nodes.length || !parent) {
		return;
	}

	setAsParent<N, N>(parent, ...nodes);
	setSiblings<N, S>([node as S, ...nodes, nextSiblingOf<N, S>(node)].filter(Boolean) as ReadonlyArray<S>);
};

export const before = <
	N extends object = object,
	S extends N = N
>(node: N, ...nodes: ReadonlyArray<S>) => {
	const parent = parentOf(node);

	if (!nodes.length || !parent) {
		return;
	}

	const previousSibling = previousSiblingOf<N, S>(node);

	if (!previousSibling) {
		setChildOf(parent as N, nodes.at(0) as S);
	}

	setAsParent<N, N>(parent, ...nodes);
	setSiblings<N, S>([previousSibling, ...nodes, node as S].filter(Boolean) as ReadonlyArray<S>);
};

export default sibling;
