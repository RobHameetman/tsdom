import type { Tree } from '#tree/Tree';
import { parentOf } from '#tree/Tree/relationships/parents';

export type Roots<T extends object = object> = ReadonlyArray<T>;

/**
 * The root of an object is itself, if its parent is undefined, or else it is the
 * root of its parent. The root of a tree is any object participating in that
 * tree whose parent is null.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-parent
 */
export const roots = new WeakMap<Tree | object, object | Tree>();

let currentRoot: object | undefined;
let currentTree: Tree | undefined;

export const removeRoot = (tree: Tree) => {
	if (currentTree !== tree) {
		currentTree = tree;
		currentRoot = roots.get(tree);
	}

	if (currentRoot) {
		roots.delete(tree);

		currentRoot = undefined;
		currentTree = undefined;

		// tree[Symbol.dispose](); // Is this something we want to do here?
	}
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

export const rootOfTree = <
	T extends object = object
>(tree: Tree) => {
	if (currentTree !== tree) {
		currentTree = tree;
		currentRoot = roots.get(tree);
	}

	return currentRoot as T | undefined;
};

export const setRootOf = <
	T extends object = object
>(tree: Tree, node: T) => {
	if (currentTree !== tree) {
		currentTree = tree;
		currentRoot = roots.get(tree);
	}

	if (!currentRoot) {
		roots.set(tree, node);
		// roots.set(node, tree);

		currentRoot = node;
	}
};

// export const treeOf = <
// 	T extends object = object
// >(node: T) => {
// 	if (currentRoot !== node) {
// 		currentRoot = node;
// 		currentTree = roots.get(node) as Tree<T> | undefined;
// 	}

// 	return currentTree;
// };

export default roots;
