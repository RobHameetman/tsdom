import type { PotentialEventTarget } from '#public/EventTarget';

/**
 * @see https://dom.spec.whatwg.org/#event-relatedtarget
 */
export const relatedTarget = new WeakMap<Event, PotentialEventTarget>();

export const relatedTargetOf = (event: Event) => {
	return relatedTarget.get(event) || null;
};

export const setRelatedTargetToNullFor = (event: Event) => {
	relatedTarget.set(event, null);
};

export const setRelatedTargetOf = (event: Event, targetToSet: EventTarget) => {
	relatedTarget.set(event, targetToSet);
};
