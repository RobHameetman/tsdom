export enum EventPhase {
	None = 0,
	Capturing = 1,
	AtTarget = 2,
	Bubbling = 3,
}

/**
 * @see https://dom.spec.whatwg.org/#dom-event-eventphase
 */
export const eventPhase = new WeakMap<Event, EventPhase>();

export const eventPhaseOf = (event: Event) => {
	return eventPhase.get(event) || EventPhase.None;
};

export const setPhaseToNone = (event: Event) => {
	eventPhase.set(event, EventPhase.None);
};

export const setPhaseToCapturing = (event: Event) => {
	eventPhase.set(event, EventPhase.Capturing);
};

export const setPhaseToAtTarget = (event: Event) => {
	eventPhase.set(event, EventPhase.AtTarget);
};

export const setPhaseToBubbling = (event: Event) => {
	eventPhase.set(event, EventPhase.Bubbling);
};
