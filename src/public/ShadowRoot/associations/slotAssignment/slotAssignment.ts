/**
 * @see https://dom.spec.whatwg.org/#shadowroot-slot-assignment
 */
const slotAssignment = new WeakMap<ShadowRoot, SlotAssignmentMode>();

export const disposeSlotAssignmentOf = (shadowRoot: ShadowRoot) => {
	slotAssignment.delete(shadowRoot);
};

export const initializeSlotAssignmentOf = (shadowRoot: ShadowRoot) => {
	if (!slotAssignment.has(shadowRoot)) {
		slotAssignment.set(shadowRoot, 'named');
	}
};

export const slotAssignmentOf = (shadowRoot: ShadowRoot) => {
	return slotAssignment.get(shadowRoot) || 'named';
};

export const setSlotAssignmentOf = (shadowRoot: ShadowRoot, value: SlotAssignmentMode) => {
	slotAssignment.set(shadowRoot, value);
};
