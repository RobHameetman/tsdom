/**
 * @see https://dom.spec.whatwg.org/#concept-element-custom-element-state
 */
export type CustomElementState = 'undefined' | 'failed' | 'uncustomized' | 'precustomized' | 'custom';

const customElementState = new WeakMap<Element, CustomElementState>();

export const disposeCustomElementStateOf = (node: Element) => {
	customElementState.delete(node);
};

export const customElementStateOf = (node: Element) => {
	return customElementState.get(node) || 'undefined';
};

export const initializeCustomElementStateOf = (node: Element) => {
	if (!customElementState.has(node)) {
		customElementState.set(node, 'undefined');
	}
};

export const setCustomElementStateOf = (node: Element, state: CustomElementState) => {
	customElementState.set(node, state);
};
