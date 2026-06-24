import { isSlot } from '#public/HTMLSlotElement';
import assignedSlot from '#mixins/Slottable/associations/assignedSlot';
import { inclusiveDescendantsOf } from '#tree/Tree/relationships/children';

/**
 * @see https://dom.spec.whatwg.org/#find-a-slot
 *
 * @param slot - A slot element.
 */
export const assignSlottablesForTreeOf = (slot: HTMLSlotElement) => {
	inclusiveDescendantsOf(slot).forEach((node) => {
		if (isSlot(node)) {
			assignedSlot.set(node, null);
		}
	});
};

export default assignSlottablesForTreeOf;
