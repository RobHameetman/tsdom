/**
 * @see https://dom.spec.whatwg.org/#dom-event-type
 */
const type = new WeakMap<Event, string>();

export const typeOf = (event: Event) => {
	return type.get(event) || '';
};

export const initializeTypeOf = (event: Event, typeString: string) => {
	if (!type.has(event)) {
		type.set(event, typeString);
	}
};

/**
 * Sets the type of the given event. The type is only overridden temporarily in
 * some very specific cases in the {@link invoke()} algorithm.
 *
 * @param event - The event to set the type for.
 * @param typeString - The type string to set.
 */
export const setTypeOf = (event: Event, typeString: string) => {
	type.set(event, typeString);
};
