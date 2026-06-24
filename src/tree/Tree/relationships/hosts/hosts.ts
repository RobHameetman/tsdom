import type { Tree } from '#tree/Tree';
import OrderedSet from '#infra/OrderedSet';
import { parentOf } from '#tree/Tree/relationships/parents';
import { childrenOf, descendantsOf } from '#tree/Tree/relationships/children';
import { isRoot, rootOf } from '#tree/Tree/relationships/roots';

/**
 * An object A hosting object B is a host of B. An object may be hosted by
 * a node in a different tree if it is a root of a subtree that has been
 * moved to that tree. All hosts are linked to a root, but not all roots
 * have hosts.
 *
 * @see https://dom.spec.whatwg.org/#concept-documentfragment-host
 *
 * @remarks
 * Hosts map root ↔︎ host bidirectionally, meaning the root is the key of its
 * host and the host is the key of its root.
 */
export const hosts = new WeakMap<object, object>();

/**
 * Returns the host-including ancestors of a given `node`.
 *
 * @see https://dom.spec.whatwg.org/#concept-tree-host-including-inclusive-ancestor
 *
 * @typeParam `N` - The type of the node whose host-including ancestors are to be retrieved.
 * @typeParam `A` - The type of the host-including ancestor objects.
 *
 * @param tree - The tree in which to look for host-including ancestors.
 * @param node - The node for which to find host-including ancestors.
 *
 * @returns An {@link OrderedSet} of host-including ancestors.
 */
export const hostIncludingAncestorsOf = <
	N extends object = object,
>(node: N) => {
	let ancestors = new OrderedSet<N>();
	let parent = parentOf<N>(node);

	while (parent) {
		ancestors.append(parent);

		let nextParent = parentOf<N>(parent);

		parent = nextParent
			? nextParent
			: hostOf(parent);
	}

	return ancestors;
};

export const hostIncludingDescendantsOf = <
	N extends object = object,
>(node: N) => {
	let descendants = new OrderedSet<N>();

	if (isHost(node)) {
		const root = hostedBy<N>(node);

		if (root) {
			descendants.extend(hostIncludingInclusiveDescendantsOf(root));
		}
	}

	for (const child of childrenOf(node)) {
		descendants.extend(hostIncludingInclusiveDescendantsOf(child));
	}

	return descendants;
};

export const hasHost = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(root: R) => {
	return hostOf(root) !== undefined;
};

export const hostIncludingInclusiveAncestorsOf = <
	N extends object = object
>(node: N) => {
	return hostIncludingAncestorsOf(node).prepend(node);
};

export const hostIncludingInclusiveDescendantsOf = <
	N extends object = object,
>(node: N) => {
	return hostIncludingDescendantsOf(node).prepend(node);
};

export const hostIncludingRootOf = <
	N extends object = object,
	R extends N = N,
>(node: N) => {
	let root = rootOf<N, N | R>(node) as R;

	if (hasHost(root)) {
		root = hostIncludingRootOf<N, R>(hostOf(root) as N);
	}

	return root;
};

export const isHostIncludingAncestorOf = <
	N extends object = object,
>(node: N, other: N) => {
	return hostIncludingAncestorsOf(node).contains(other);
};

export const isHostIncludingDescendantOf = <
	N extends object = object,
>(node: N, other: N) => {
	return hostIncludingDescendantsOf(node).contains(other);
};

export const isHostIncludingInclusiveAncestorOf = <
	N extends object = object,
>(node: N, other: N) => {
	return hostIncludingInclusiveAncestorsOf(node).contains(other);
};

export const isHostIncludingInclusiveDescendantOf = <
	N extends object = object,
>(node: N, other: N) => {
	return hostIncludingInclusiveDescendantsOf(node).contains(other);
};

export const isHost = <
	N extends object = object,
	H extends N = N,
>(node: N) => {
	return hostedBy(node) !== undefined;
};

export const isHostOf = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(root: R, other: N): other is H => {
	return hostOf<N, R, H>(root) === other;
};

export const isHostedBy = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(host: H, other: N): other is R => {
	return hostedBy<N, R, H>(host) === other;
};

export const hostOf = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(root: R) => {
	return hosts.get(root) as H | undefined;
};

export const hostedBy = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(host: H) => {
	return hosts.get(host) as R | undefined;
};

export const lastHostIncludingDescendantOf = <
	N extends object = object,
	D extends N = N
>(node: N) => {
	return hostIncludingDescendantsOf<N>(node).at(-1);
};

export const lastHostIncludingInclusiveDescendantOf = <
	N extends object = object
>(node: N) => {
	return hostIncludingInclusiveDescendantsOf<N>(node).at(-1);
};

export const attach = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(root: R, host: H) => {
	if (!hosts.has(root) && !hosts.has(host) && isRoot(root)) {
		hosts.set(root, host);
		hosts.set(host, root);
	}
};

export const detach = <
	N extends object = object,
	R extends N = N,
	H extends N = N,
>(root: R) => {
	hosts.delete(hostOf<N, R, H>(root) as N);
	hosts.delete(root);
};

export default hosts;
