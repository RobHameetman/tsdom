/**
 * @see https://dom.spec.whatwg.org/#slotable-assigned
 *
 * @param slottable - A slottable node.
 *
 * @returns A boolean which is `true` if `slottable` has an assigned slot which
 * is not `null`, and `false` otherwise.
 */
export const isAssigned = (slottable: Slottable) =>
	slottable.assignedSlot !== null;

export default isAssigned;
