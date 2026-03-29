import List from '@/infra/List';
import type { PotentialEventTarget } from '@/public/EventTarget';

/**
 * @see https://dom.spec.whatwg.org/#event-path
 */
export interface Path {
	invocationTarget: EventTarget;
	invocationTargetInShadowTree: boolean;
	relatedTarget: PotentialEventTarget;
	rootOfClosedTree: boolean;
	shadowAdjustedTarget: PotentialEventTarget;
	slotInClosedTree: boolean;
	touchTargetList: List<PotentialEventTarget>;
}

type FirstPathPredicate = Parameters<Array<Path>['find']>[0];
type LastPathPredicate = Parameters<Array<Path>['findLast']>[0];

/**
 * @see https://dom.spec.whatwg.org/#event-path
 */
export const path = new WeakMap<Event, List<Path>>();

export const firstPathOf = (event: Event, predicate = (() => true) as FirstPathPredicate) => {
	const paths = pathOf(event);

	return paths.find(predicate) || null;
};

export const lastPathOf = (event: Event, predicate = (() => true) as LastPathPredicate) => {
	const paths = pathOf(event);

	return paths.findLast(predicate) || null;
};

export const pathOf = (event: Event) => {
	return path.get(event) || new List<Path>();
};

export const setPathToEmptyListFor = (event: Event) => {
	if (!path.has(event)) {
		path.set(event, new List<Path>());
	} else {
		(path.get(event) as List<Path>).empty();
	}
};
