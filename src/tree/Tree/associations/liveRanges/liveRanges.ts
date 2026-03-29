import List from '@/infra/List';
import { rootOf } from '@/tree/Tree/relationships/parents';

/**
 * Algorithms that modify a tree modify live ranges associated with that tree.
 *
 * @see https://dom.spec.whatwg.org/#concept-live-range
 */
export const liveRanges = new WeakMap<object, List<Range>>();

export const liveRangesOf = <N extends object = object, C extends N = N>(node: N) => {
	const root = rootOf(node);

	if (!liveRanges.has(root)) {
		liveRanges.set(root, new List<Range>());
	}

	return liveRanges.get(root) as List<Range>;
};
