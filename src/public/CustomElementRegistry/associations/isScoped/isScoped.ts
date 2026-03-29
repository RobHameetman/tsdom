/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#is-scoped
 */
const isScoped = new WeakMap<CustomElementRegistry, boolean>();

export const disposeIsScopedOf = (registry: CustomElementRegistry) => {
	isScoped.delete(registry);
};

export const isScopedOf = (registry: CustomElementRegistry) => {
	return isScoped.get(registry) ?? false;
};

export const setIsScopedOf = (registry: CustomElementRegistry, value: boolean) => {
	isScoped.set(registry, value);
};
