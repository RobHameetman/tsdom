import { OrderedSet } from '@/infra/OrderedSet';
import { ancestorsOf, isAncestorOf, parentOf, removeParentOf, rootOf, setAsParent } from '@/tree/Tree/relationships/parents';
import { inclusiveSiblingsOf, nextSiblingOf, previousSiblingOf, removeSiblingOf, setSiblings } from '@/tree/Tree/relationships/siblings';
import { treeOrderHasChangedFor } from '@/tree/Tree/traversal/order';

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
export const child = new WeakMap<object, object>();

export const childrenOf = <
	N extends object = object,
	C extends N = N
>(node: N) => {
	const children = new OrderedSet<C>();
	let currentChild = child.get(node) as C | undefined;

	while (currentChild) {
		children.append(currentChild);
		currentChild = nextSiblingOf(currentChild) as C | undefined;
	}

	return children;
};

export const descendantsOf = <
	N extends object = object,
	D extends N = N,
>(node: N) => {
	let descendants = new OrderedSet<D>();

	for (const child of childrenOf<N, D>(node)) {
		descendants.extend(inclusiveDescendantsOf(child));
	}

	return descendants;
};

export const firstChildOf = <
	N extends object = object,
	C extends N = N
>(node: N) => {
	return child.get(node) as C | undefined;
};

export const hasChildren = <
	N extends object = object
>(node: N) => {
	return child.has(node);
};

export const hasNoChildren = <
	N extends object = object
>(node: N) => {
	return !child.has(node);
};

export const indexOf = <
	N extends object = object
>(node: N, raw = false) => {
	const index = inclusiveSiblingsOf(node).indexOf(node);

	if (index === -1 && !raw) {
		return 0;
	}

	return index;
};

export const inclusiveDescendantsOf = <
	N extends object = object,
	D extends N = N,
>(node: N) => {
	return descendantsOf<N, N | D>(node).prepend(node);
};

export const isDescendantOf = <
	N extends object = object,
	D extends N = N,
>(node: N, other: N | D): other is D => {
	return isAncestorOf(other, node);
};

export const isFirstChild = <
	N extends object = object,
	C extends N = N
>(node: N): node is C => {
	const parent = parentOf(node);

	return parent !== undefined && isFirstChildOf(parent, node);
};

export const isFirstChildOf = <
	N extends object = object,
	C extends N = N
>(node: N, other: N | C): other is C => {
	return firstChildOf(node) === other;
};

export const isInclusiveDescendantOf = <
	N extends object = object,
	D extends N = N
>(node: N, other: N | D) => {
	return inclusiveDescendantsOf(node).contains(other);
};

export const isLastChild = <
	N extends object = object,
	C extends N = N
>(node: N): node is C => {
	const parent = parentOf(node);

	return parent !== undefined && isLastChildOf(parent, node);
};

export const isLastChildOf = <
	N extends object = object,
	C extends N = N
>(parent: N, node: N | C): node is C => {
	return lastChildOf(parent) === node;
};

export const lastChildOf = <
	N extends object = object,
	S extends N = N
>(node: N) => {
	return childrenOf<N, S>(node).at(-1);
};

export const lastDescendantOf = <
	N extends object = object,
	D extends N = N
>(node: N) => {
	return descendantsOf<N, D>(node).at(-1);
};

export const lastInclusiveDescendantOf = <
	N extends object = object,
	D extends N = N
>(node: N) => {
	return inclusiveDescendantsOf<N, D>(node).at(-1);
};

export const removeChildOf = <
	N extends object = object
>(node: N) => {
	child.delete(node);
	treeOrderHasChangedFor(rootOf(node));
};

export const setChildOf = <
	N extends object = object,
>(parent: N, firstChild: N) => {
	child.set(parent, firstChild);
	treeOrderHasChangedFor(rootOf(parent));
};

export const append = <
	N extends object = object,
	C extends N = N,
>(node: N, ...nodes: ReadonlyArray<C>) => {
	if (!nodes.length) {
		return;
	}

	if (!hasChildren(node)) {
		setChildOf(node, nodes.at(0) as C);
	}

	setAsParent<N, N>(node, ...nodes);
	setSiblings([lastChildOf<N, C>(node), ...nodes].filter(Boolean) as ReadonlyArray<C>);
};

export const prepend = <
	N extends object = object,
	C extends N = N
>(node: N, ...nodes: ReadonlyArray<C>) => {
	if (!nodes.length) {
		return;
	}

	setChildOf(node, nodes.at(0) as C);
	setAsParent<N, N>(node, ...nodes);
	setSiblings<N, C>([...nodes, firstChildOf<N, C>(node)].filter(Boolean) as ReadonlyArray<C>);
};

export const replace = <
	N extends object = object
>(node: N, ...nodes: ReadonlyArray<N>) => {
	const parent = parentOf(node);

	if (!nodes.length || !parent) {
		return;
	}

	const previousSibling = previousSiblingOf(node);
	const nextSibling = nextSiblingOf(node);

	if (!previousSibling) {
		setChildOf(parent, nodes.at(0) as N);
	}

	setAsParent<N, N>(parent, ...nodes);
	setSiblings([previousSibling, ...nodes, nextSibling].filter(Boolean) as ReadonlyArray<N>);

	removeParentOf(node);
	removeSiblingOf(node);
};

export const remove = <
	N extends object = object
>(node: N) => {
	const parent = parentOf(node);

	if (!parent) {
		return;
	}

	const prevSibling = previousSiblingOf(node);
	const nextSibling = nextSiblingOf(node);

	if (!prevSibling && nextSibling) {
		setChildOf(parent, nextSibling);
	} else if (!nextSibling && !prevSibling) {
		removeChildOf(parent);
	}

	setSiblings<N, N>([prevSibling, nextSibling].filter(Boolean) as ReadonlyArray<N>);

	removeParentOf(node);
	removeSiblingOf(node);
};
