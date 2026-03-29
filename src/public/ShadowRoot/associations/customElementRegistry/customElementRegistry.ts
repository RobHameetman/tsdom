/**
 * @see https://dom.spec.whatwg.org/#shadowroot-custom-element-registry
 */
const customElementRegistry = new WeakMap<ShadowRoot, CustomElementRegistry | null>();

export const disposeCustomElementRegistryOf = (shadowRoot: ShadowRoot) => {
	customElementRegistry.delete(shadowRoot);
};

export const initializeCustomElementRegistryOf = (shadowRoot: ShadowRoot) => {
	if (!customElementRegistry.has(shadowRoot)) {
		customElementRegistry.set(shadowRoot, null);
	}
};

export const customElementRegistryOf = (shadowRoot: ShadowRoot) => {
	return customElementRegistry.get(shadowRoot) ?? null;
};

export const setCustomElementRegistryOf = (
	shadowRoot: ShadowRoot,
	value: CustomElementRegistry | null,
) => {
	customElementRegistry.set(shadowRoot, value);
};
