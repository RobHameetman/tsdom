/**
 * @see https://dom.spec.whatwg.org/#find-a-slot
 *
 * @param slottable - A slottable node.
 * @param open - A flag denoting whether to search open shadow trees.
 */
export const findASlot = (
	slottable: Slottable,
	open = false
) => {
	if ((slottable as Slottables).parentNode === null) {
		return null;
	}

	let shadow = slottable.parentNode.shadowRoot;

	if (shadow === null) {
		return null;
	}

	if (open && shadow.mode === 'closed') {
		return null;
	}

	if (hasSlotAssignment(shadow, 'manual')) {
		/**
		 * return the slot in shadow’s descendants whose manually assigned nodes
		 * contains slottable, if any; otherwise null.
		 */
	}

	/**
	 * Return the first slot in tree order in shadow’s descendants whose name is
	 * slottable’s name, if any; otherwise null.
	 */
};

export default addAnEventListener;
