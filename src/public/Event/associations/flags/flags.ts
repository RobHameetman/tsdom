/**
 * @see https://dom.spec.whatwg.org/#event-path
 */
export enum EventFlag {
	None = 0,
	StopPropagation = 1 << 1,
	StopImmediatePropagation = 1 << 2,
	Canceled = 1 << 3,
	InPassiveListener = 1 << 4,
	Composed = 1 << 5,
	Initialized = 1 << 6,
	Dispatch = 1 << 7,
}

export type EventFlags = number;

/**
 * @see https://dom.spec.whatwg.org/#event-path
 */
export const flags = new WeakMap<Event, EventFlags>();

export const setFlagsOf = (event: Event, ...flagsToSet: ReadonlyArray<EventFlags>) => {
	let eventFlags = flags.get(event) || EventFlag.None;

	flagsToSet.forEach((flag) => {
		eventFlags |= flag;
	});

	flags.set(event, eventFlags);
};

export const isFlagSetFor = (event: Event, flag: EventFlag) => {
	return ((flags.get(event) || EventFlag.None) & flag) === flag;
};

export const isFlagUnsetFor = (event: Event, flag: EventFlag) => {
	return !isFlagSetFor(event, flag);
};

export const unsetFlagsOf = (event: Event, ...flagsToUnset: ReadonlyArray<EventFlags>) => {
	let eventFlags = flags.get(event) || EventFlag.None;

	flagsToUnset.forEach((flag) => {
		eventFlags &= ~flag;
	});

	flags.set(event, eventFlags);
};

export default EventFlag;
