import findSlottables from '#public/HTMLSlotElement/algorithms/findSlottables';
import { type Slottables, isSlottable } from '#nodes/mixins/Slottable';
import findASlot from '#nodes/mixins/Slottable/algorithms/findASlot';

const isSlotWhoseRootIsShadowRoot = (node: Node): node is HTMLSlotElement => {
	if (!isSlottable(node)) {
		return false;
	}

	const slot = findASlot(node);

	if (slot === null) {
		return false;
	}

	const root = slot.getRootNode();

	return root instanceof ShadowRoot;
};

/**
 * @see https://dom.spec.whatwg.org/#find-flattened-slotables
 * @param slot - A slot element.
 *
 * @returns
 */
export const findFlattenedSlottables = (slot: HTMLSlotElement) => {
	let result = [] as Array<Slottable>;

	let root = slot.getRootNode();

	if (!(root instanceof ShadowRoot)) {
		return result;
	}

	let slottables = findSlottables(slot);

	if (!slottables.length) {
		slot.childNodes.forEach((child) => {
			if (isSlottable(child)) {
				slottables.push(child as Slottables);
			}
		});
	}

	slottables.forEach((node) => {
		if (isSlotWhoseRootIsShadowRoot(node)) {
			let temporaryResult = findFlattenedSlottables(node);

			temporaryResult.forEach((slottable) => {
				result.push(slottable);
			});
		} else {
			result.push(node);
		}
	});

	return result;
};

export default findFlattenedSlottables;
