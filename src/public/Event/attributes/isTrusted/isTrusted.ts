/**
 * @see https://dom.spec.whatwg.org/#dom-event-istrusted
 */
export const isTrusted = new WeakMap<Event, boolean>();

export const isTrustedOf = (event: Event) => {
	return isTrusted.get(event) || false;
};

export const initializeIsTrustedToTrue = (event: Event) => {
	if (!isTrusted.has(event)) {
		isTrusted.set(event, true);
	}
};

export const initializeIsTrustedToFalse = (event: Event) => {
	if (!isTrusted.has(event)) {
		isTrusted.set(event, false);
	}
};

/**
 * Sets the isTrusted property of a manually created event to `false`. This is
 * used by {@link Document.createEvent()}, which runs {@link createAnEvent()}
 * internally and then sets this flag to `false`.
 *
 * @param event - A manually created event.
 */
export const setIsTrustedToFalseFor = (event: Event) => {
	isTrusted.set(event, false);
};
