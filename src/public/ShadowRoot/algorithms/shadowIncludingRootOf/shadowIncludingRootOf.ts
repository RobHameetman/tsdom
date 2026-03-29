import { rootOf } from '@/tree/Tree/relationships/parents';
import { isShadowRoot } from '@/public/ShadowRoot';

/**
 * The shadow-including root of an object is its root’s host’s shadow-including
 * root, if the object’s root is a shadow root; otherwise its root.
 *
 * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
 */
export type ShadowIncludingRootOf<
	N extends Node = Node,
	R extends ReturnType<N['getRootNode']> = ReturnType<N['getRootNode']>,
> =
	R extends ShadowRoot
		? ShadowIncludingRootOf<R['host']>
		: R

/**
 * Returns the shadow-including root of a given `node`.
 *
 * @param node - A node whose shadow-including root is to be retrieved.
 *
 * @returns The shadow-including root of the given `node`.
 */
export const shadowIncludingRootOf = <
	N extends Node = Node,
	R extends ReturnType<N['getRootNode']> = ReturnType<N['getRootNode']>,
>(
	node: N,
): ShadowIncludingRootOf<N, R> => {
	const root = rootOf(node);

	if (isShadowRoot(root)) {
		return shadowIncludingRootOf(root.host);
	}

	return root as ShadowIncludingRootOf<N, R>;
};

export const isShadowIncludingRootOf = <
	N extends Node = Node,
	R extends ReturnType<N['getRootNode']> = ReturnType<N['getRootNode']>,
>(
	node: N,
	shadowIncludingRoot: Node,
): shadowIncludingRoot is ShadowIncludingRootOf<N, R> =>
	shadowIncludingRoot.isSameNode(shadowIncludingRootOf(node));

export default shadowIncludingRootOf;
