/**
 * @see https://dom.spec.whatwg.org/#document-allow-declarative-shadow-roots
 */
export type AssignedSlot = HTMLSlotElement | null;

export const assignedSlot = new WeakMap<Slottable, AssignedSlot>();

export default assignedSlot;
