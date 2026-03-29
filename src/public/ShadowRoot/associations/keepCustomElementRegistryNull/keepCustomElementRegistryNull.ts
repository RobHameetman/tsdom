/**
 * @see https://dom.spec.whatwg.org/#shadowroot-keep-custom-element-registry-null
 */
export type KeepCustomElementRegistryNull = boolean;

const keepCustomElementRegistryNull = new WeakMap<ShadowRoot, KeepCustomElementRegistryNull>();

export const disposeKeepCustomElementRegistryNullOf = (shadowRoot: ShadowRoot) => {
	keepCustomElementRegistryNull.delete(shadowRoot);
};

export const keepCustomElementRegistryNullOf = (shadowRoot: ShadowRoot) => {
	return keepCustomElementRegistryNull.get(shadowRoot) || false;
};

export const initializeKeepCustomElementRegistryNullOf = (shadowRoot: ShadowRoot, value: KeepCustomElementRegistryNull) => {
	if (!keepCustomElementRegistryNull.has(shadowRoot)) {
		keepCustomElementRegistryNull.set(shadowRoot, value);
	}
};

export const setKeepCustomElementRegistryNullOf = (shadowRoot: ShadowRoot, value: KeepCustomElementRegistryNull) => {
	keepCustomElementRegistryNull.set(shadowRoot, value);
};
