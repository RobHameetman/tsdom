import type { ListLike } from '@/infra/ListLike';
import OrderedSet, { type ReadonlyOrderedSet } from '@/infra/OrderedSet';
import Stack from '@/infra/Stack';
import { childrenOf } from '@/tree/Tree/relationships/children';
import { hostedBy, isHost } from '@/tree/Tree/relationships/hosts';
import { rootOf } from '@/tree/Tree/relationships/parents';

/**
 * An object A whose parent is object B is a child of B.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-child
 */
const preorder = new WeakMap<object, number>();
const postorder = new WeakMap<object, number>();
const valid = new WeakSet<object>();

let isComposed = false;

const recompute = <N extends object = object>(root: N, composed = false) => {
	using stack = new Stack<[N, 'enter' | 'exit']>([root, 'enter']);
  let time = 0;

	while (!stack.isEmpty()) {
		const [node, phase] = stack.pop() as [N, 'enter' | 'exit'];

		if (phase === 'enter') {
			preorder.set(node, time++);
			stack.push([node, 'exit']);

			childrenOf(node).reverse().forEach((child) => {
				stack.push([child, 'enter']);
			});

			if (composed && isHost(node)) {
				stack.push([hostedBy(node) as N, 'enter']);
			}
		} else {
			postorder.set(node, time++);
		}
	}

	valid.add(root);
	isComposed = composed;
};

export const preorderOf = <N extends object = object>(node: N) => {
	return preorder.get(node) || 0;
};

export const postorderOf = <N extends object = object>(node: N) => {
	return postorder.get(node) || 0;
};

export const treeOrderHasChangedFor = <N extends object = object>(root: N) => {
	valid.delete(root);
};

export const compareTreeOrder = <N extends object = object>(a: N, b: N) => {
  if (a === b || !preorder.has(a) || !preorder.has(b)) {
		return 0;
	}

	return preorderOf(a) - preorderOf(b);
};

export const inTreeOrder = <N>(root: N, composed = false) => {
  if (!treeOrderIsValidFor(root as object, composed)) {
    recompute(root as object, composed);
  }

	return compareTreeOrder as Exclude<Parameters<Array<N>['sort']>[0], undefined>;
};

export const inComposedTreeOrder = <N>(root: N) => {
  return inTreeOrder<N>(root, true);
};

export const isFollowing = <N extends object = object>(node: N, other: N, composed = false) => {
  if (node === other) {
		return false;
	}

	const root = rootOf(node);

  if (!treeOrderIsValidFor(root, composed)) {
    recompute(root, composed);
  }

  if (!preorder.has(node) || !preorder.has(other)) {
    return false;
  }

  return preorderOf(other) > preorderOf(node);
};

export const isPreceding = <N extends object = object>(node: N, other: N, composed = false) => {
  if (node === other) {
		return false;
	}

	const root = rootOf(node);

  if (!treeOrderIsValidFor(root, composed)) {
    recompute(root, composed);
  }

  if (!preorder.has(node) || !preorder.has(other)) {
    return false;
  }

  return preorderOf(other) < preorderOf(node);
};

export const preceding = <N extends object = object>(node: N, composed = false) => {
	const root = rootOf(node);

  if (!treeOrderIsValidFor(root, composed)) {
    recompute(root, composed);
  }

	const nodes = new OrderedSet<N>();

	if (!preorder.has(node) || !postorder.has(node)) {
    return nodes;
  }

  const nodePreorder = preorder.get(node) as number;

  for (const currentNode of treeOf(root)) {
    if (currentNode === node) {
			break;
		}

    if (preorder.has(currentNode) && postorder.has(currentNode)) {
			if (preorder.get(currentNode) as number < nodePreorder) {
				nodes.append(currentNode as N);
			}
    }
  }

  return nodes.ascending(compareTreeOrder);
};

export const following = <N extends object = object>(node: N, composed = false) => {
	const root = rootOf(node);

  if (!treeOrderIsValidFor(root, composed)) {
    recompute(root, composed);
  }

	const nodes = new OrderedSet<N>();

	if (!preorder.has(node) || !postorder.has(node)) {
    return nodes;
  }

  const nodePreorder = preorder.get(node) as number;

  for (const currentNode of treeOf(root)) {
    if (currentNode === node) {
			continue;
		}

    if (preorder.has(currentNode) && postorder.has(currentNode)) {
			if (preorder.get(currentNode) as number > nodePreorder) {
				nodes.append(currentNode as N);
			}
    }
  }

  return nodes.ascending(compareTreeOrder);
};

export const treeOrderIsValidFor = <N extends object = object>(root: N, composed = false) => {
	return valid.has(root) && isComposed === composed;
};

export function* treeOf<N extends object = object>(root: N, composed = false) {
  using stack = Stack.of<N>(root);

	if (!treeOrderIsValidFor(root, composed)) {
    recompute(root, composed);
  }

  while (!stack.isEmpty()) {
    const node = stack.pop() as N;

		yield node;

    childrenOf(node).reverse().forEach((child) => {
			stack.push(child);
		});

		if (composed && isHost(node)) {
			stack.push(hostedBy(node) as N);
		}
  }
}
