import assignedNodes from '@/public/HTMLSlotElement/associations/assignedNodes';
import assignedSlot from '@/nodes/mixins/Slottable/associations/assignedSlot';
import findSlottables from '@/public/HTMLSlotElement/algorithms/findSlottables';

/**
 * @see https://dom.spec.whatwg.org/#find-a-slot
 *
 * @param slot - A slot element.
 */
export const assignSlottables = (
	slot: HTMLSlotElement,
) => {
	let slottables = findSlottables(slot);

	/**
	 * If slottables and slot’s assigned nodes are not identical, then run signal
	 * a slot change for slot.
	 */

	assignedNodes.set(slot, slottables);

	for (const slottable of slottables) {
		assignedSlot.set(slottable, slot);
	}
};

export default assignSlottables;
