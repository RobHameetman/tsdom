/**
 * @see https://dom.spec.whatwg.org/#element-custom-element-registry
 */
const customElementRegistry = new WeakMap<Element, CustomElementRegistry | null>();

export const disposeCustomElementRegistryOf = (node: Element) => {
	customElementRegistry.delete(node);
};

export const customElementRegistryOf = (node: Element) => {
	return customElementRegistry.get(node) || null;
};

export const customElementRegistryIsNullOf = (node: Element) => {
	return customElementRegistryOf(node) === null;
};

export const initializeCustomElementRegistryOf = (node: Element) => {
	if (!customElementRegistry.has(node)) {
		customElementRegistry.set(node, null);
	}
};
