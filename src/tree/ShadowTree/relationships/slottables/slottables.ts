import OrderedSet from '@/infra/OrderedSet';
import type { Slot } from '@/tree/ShadowTree/relationships/slots';

export type Slottables = Text | Element;

const names = new WeakMap<Slottable, string>();
const assignedSlots = new WeakMap<Slottable, OrderedSet<Slot>>();
const manuallyAssignedSlots = new WeakMap<Slottable, OrderedSet<Slot>>();

export const isSlottable = <N extends Node = Node>(node: N) => {
	return node instanceof Text || node instanceof Element;
};

export const nameOf = <S extends Slottable = Slottable>(slottable: S) => {
	return names.get(slottable) || '';
};

export const setNameOf = <S extends Slottable = Slottable>(slottable: S, name: string) => {
	names.set(slottable, name);
};

export const assignedSlotsOf = <S extends Slottable = Slottable>(slottable: S) => {
	return assignedSlots.get(slottable);
};

export const assignSlotsOf = <S extends Slottable = Slottable>(slottable: S, slots: OrderedSet<Slot>) => {
	return assignedSlots.set(slottable, slots);
};

export const manuallyAssignedSlotsOf = <S extends Slottable = Slottable>(slottable: S) => {
	return manuallyAssignedSlots.get(slottable) || new OrderedSet<Slot>();
};

export const manuallyAssignSlotsOf = <S extends Slottable = Slottable>(slottable: S, slots: OrderedSet<Slot>) => {
	return manuallyAssignedSlots.set(slottable, slots);
};
