import OrderedSet from '#infra/OrderedSet';
import { childrenOf } from '#tree/Tree/relationships/children';
import { rootOf } from '#tree/Tree/relationships/parents';
import { hostedBy, hostIncludingAncestorsOf, hostOf, isHost } from '#tree/Tree/relationships/hosts';

export const isShadowHost = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
>(node: N) => {
	return shadowRootOf<N>(node) !== null;
};

export const isShadowIncludingAncestorOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	A extends N = N,
>(node: N, other: N): other is A => {
	return isShadowIncludingDescendantOf<N, A>(other, node);
};

export const isShadowIncludingDescendantOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	D extends N = N,
>(node: N, other: N): other is D => {
	return shadowIncludingDescendantsOf<N, D>(node).contains(other as N & D);
};

export const isShadowIncludingInclusiveAncestorOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	A extends N = N,
>(node: N, other: N): other is N | A => {
	return shadowIncludingInclusiveAncestorsOf<N, A>(node).contains(other);
};

export const isShadowIncludingInclusiveDescendantOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	D extends N = N,
>(node: N, other: N): other is N | D => {
	return shadowIncludingInclusiveDescendantsOf<N, D>(node).contains(other);
};

export const shadowIncludingAncestorsOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	A extends N = N,
>(node: N) => {
	return hostIncludingAncestorsOf<N>(node);
};

export const shadowIncludingDescendantsOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	D extends N = N,
>(node: N) => {
	let descendants = new OrderedSet<D>();

	if (isHost(node)) {
		const root = hostedBy(node) as D;

		if (root instanceof ShadowRoot) {
			descendants.extend(shadowIncludingInclusiveDescendantsOf<N, D>(root) as OrderedSet<D>);
		}
	}

	for (const child of childrenOf<N, D>(node)) {
		descendants.extend(shadowIncludingInclusiveDescendantsOf<N, D>(child) as OrderedSet<D>);
	}

	return descendants;
};

export const shadowIncludingInclusiveAncestorsOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	D extends N = N,
>(node: N) => {
	return shadowIncludingAncestorsOf<N, N | D>(node).prepend(node);
};

export const shadowIncludingInclusiveDescendantsOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	D extends N = N,
>(node: N) => {
	return shadowIncludingDescendantsOf<N, N | D>(node).prepend(node);
};

export const shadowIncludingRootOf = <
	N extends Node | ShadowRoot = Node | ShadowRoot,
	R extends Exclude<N, ShadowRoot> = Exclude<N, ShadowRoot>,
	H extends N = N,
>(node: N) => {
	let root = rootOf<N>(node) as N | R;

	if (root instanceof ShadowRoot) {
		root = shadowIncludingRootOf<N, R, H>(hostOf<N, N & ShadowRoot, H>(root) as H) as N | R;
	}

	return root as R;
};

export const shadowRootOf = <
	N extends Node = Node,
>(node: N) => {
	const root = rootOf<N>(node);

	return root instanceof ShadowRoot
		? root as ShadowRoot
		: null;
};
