export type Slot = HTMLSlotElement;

export const isSlot = (value: unknown): value is Slot => {
	return value instanceof HTMLSlotElement;
};
