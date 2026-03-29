import OrderedSet from '@/infra/OrderedSet';
import type { Slottables } from '@/tree/ShadowTree/relationships/slottables';
import type { Slot } from '@/tree/ShadowTree/types/Slot';

const names = new WeakMap<Slot, string>();
const assignedNodes = new WeakMap<Slot, OrderedSet<Slottables>>();

export const isSlot = (node: Node): node is Slot => {
	return node instanceof HTMLSlotElement;
};

export const nameOf = (slot: Slot) => {
	return names.get(slot) || '';
};

export const setNameOf = (slot: Slot, name: string) => {
	names.set(slot, name);
};

export const assignedNodesOf = (slot: Slot) => {
	return assignedNodes.get(slot);
};

export const assignNodesOf = (slot: Slot, nodes: OrderedSet<Slottables>) => {
	return assignedNodes.set(slot, nodes);
};
