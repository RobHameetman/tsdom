import List from '#infra/List';
import type { PotentialEventTarget } from '#public/EventTarget';

/**
 * @see https://dom.spec.whatwg.org/#event-touch-target-list
 */
export const touchTargetList = new WeakMap<Event, List<PotentialEventTarget>>();

export const setTouchTargetsToEmptyListFor = (event: Event) => {
	if (!touchTargetList.has(event)) {
		touchTargetList.set(event, new List<PotentialEventTarget>());
	} else {
		(touchTargetList.get(event) as List<PotentialEventTarget>).empty();
	}
};

export const setTouchTargetListOf = (event: Event, list: List<PotentialEventTarget>) => {
	touchTargetList.set(event, list);
};

export const touchTargetListFor = (event: Event) => {
	return touchTargetList.get(event) || new List<PotentialEventTarget>();
};
