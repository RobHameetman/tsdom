/**
 * Stores a list of states for an autonomous custom element, and allows states
 * to be added and removed from the set. The interface can be used to expose the
 * internal states of a custom element, allowing them to be used in CSS
 * selectors by code that uses the element (e.g. :state(checked)).
 *
 * Each value is a custom identifier. Identifiers can be added to the set or
 * deleted. If an identifier is present in the set the particular state is `true`,
 * while if it is removed the state is `false`.
 *
 * @param states - An optional iterable of strings to initialize the set with.
 *
 * @returns A {@link CustomStateSet}.
 */
export const CustomStateSet = function(states?: Iterable<string> | null | undefined) {
	const set = new Set<string>(states);

	Object.create(set, {
		[Symbol.toStringTag]: {
			value: 'CustomStateSet',
			configurable: true,
		},
	});

	return set as CustomStateSet;
};

/**
 * Checks that an `unknown` value is a {@link CustomStateSet}.
 *
 * Requirements:
 *   - `value` must be a valid instance of `CustomStateSet` or an object whose values are `Node`s.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CustomStateSet}.
 */
export const isCustomStateSet = (value: unknown): value is CustomStateSet =>
	typeof globalThis.CustomStateSet !== 'undefined' &&
	value instanceof globalThis.CustomStateSet;

export default CustomStateSet;
