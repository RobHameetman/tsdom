/**
 * @see https://dom.spec.whatwg.org/#document-allow-declarative-shadow-roots
 */
export type ManuallyAssignedSlot = HTMLSlotElement | null;

export const manuallyAssignedSlot = new WeakMap<Slottable, ManuallyAssignedSlot>();

export default manuallyAssignedSlot;
