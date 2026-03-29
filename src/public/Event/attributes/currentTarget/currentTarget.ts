import type { PotentialEventTarget } from '@/public/EventTarget';

/**
 * @see https://dom.spec.whatwg.org/#dom-event-currenttarget
 */
export const currentTarget = new WeakMap<Event, PotentialEventTarget>();

export const currentTargetOf = (event: Event) => {
	return currentTarget.get(event) || null;
};

export const initializeCurrentTargetOf = (event: Event, targetToSet: EventTarget) => {
	if (!currentTarget.has(event)) {
		currentTarget.set(event, targetToSet);
	}
};

export const setCurrentTargetToNullFor = (event: Event) => {
	currentTarget.set(event, null);
};

export const setCurrentTargetOf = (event: Event, targetToSet: EventTarget) => {
	currentTarget.set(event, targetToSet);
};
