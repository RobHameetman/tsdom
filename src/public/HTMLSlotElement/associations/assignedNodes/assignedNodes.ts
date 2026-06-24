import List from '#infra/List';
import type { Slottables } from '#nodes/mixins/Slottable';

/**
 * @see https://dom.spec.whatwg.org/#slot-assigned-nodes
 */
export type AssignedNodes = List<Slottables>;

export const assignedNodes = new WeakMap<HTMLSlotElement, AssignedNodes>();

export const assignedNodesOf = (slot: HTMLSlotElement) => {
	return assignedNodes.get(slot) || new List<Slottables>();
};

export const assignedNodesIsEmptyFor = (slot: HTMLSlotElement) => {
	return assignedNodesOf(slot).length === 0;
};

export default assignedNodes;
