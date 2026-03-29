/**
 * @see https://dom.spec.whatwg.org/#slot-name
 */
export type SlotName = string;

export const name = new WeakMap<Slottable, SlotName>();

export default name;
