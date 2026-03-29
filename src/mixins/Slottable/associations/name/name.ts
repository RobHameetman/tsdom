/**
 * @see https://dom.spec.whatwg.org/#document-allow-declarative-shadow-roots
 */
export type SlotName = string;

export const name = new WeakMap<Slottable, SlotName>();

export default name;
