import List from '#infra/List';
import manuallyAssignedNodes, { type ManuallyAssignedNodes } from '#public/HTMLSlotElement/associations/manuallyAssignedNodes';
import { type Slottables, isSlottable } from '#nodes/mixins/Slottable';
import findASlot from '#nodes/mixins/Slottable/algorithms/findASlot';

/**
 * @see https://dom.spec.whatwg.org/#find-slotables
 * @param slot - A slot element.
 *
 * @returns
 */
export const findSlottables = (slot: HTMLSlotElement) => {
	const result = new List<Slottables>();
	const root = slot.getRootNode();

	if (!(root instanceof ShadowRoot)) {
		return result;
	}

	const { host } = root;

	if (root.slotAssignment === 'manual') {
		const slottables = manuallyAssignedNodes.get(slot) as ManuallyAssignedNodes;

		slottables.forEach((slottable) => {
			if (slottable.parentNode?.isSameNode(host)) {
				result.append(slottable);
			}
		});
	} else {
		host.childNodes.forEach((slottable) => {
			const foundSlot = findASlot(slottable);

			if (foundSlot.isSameNode(slot)) {
				result.append(slottable as Slottables);
			}
		});
	}

	return result;
};

export default findSlottables;
