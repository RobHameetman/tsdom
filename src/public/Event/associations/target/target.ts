import type { PotentialEventTarget } from '#public/EventTarget';

/**
 * @see https://dom.spec.whatwg.org/#event-target
 */
export const target = new WeakMap<Event, PotentialEventTarget>();

export const targetOf = (event: Event) => {
	return target.get(event) || null;
};

export const initializeTargetToNullFor = (event: Event) => {
	if (!target.has(event)) {
		target.set(event, null);
	}
};

export const initializeTargetOf = (event: Event, targetToSet: EventTarget) => {
	if (!target.has(event)) {
		target.set(event, targetToSet);
	}
};

export const setTargetOf = (event: Event, targetToSet: PotentialEventTarget) => {
	target.set(event, targetToSet);
};
