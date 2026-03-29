/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#when-defined-promise-map
 */
const whenDefinedPromiseMap = new WeakMap<CustomElementRegistry, Map<string, Promise<void>>>();

export const disposeWhenDefinedPromiseMapOf = (registry: CustomElementRegistry) => {
	whenDefinedPromiseMap.delete(registry);
};

export const whenDefinedPromiseMapOf = (registry: CustomElementRegistry) => {
	if (!whenDefinedPromiseMap.has(registry)) {
		whenDefinedPromiseMap.set(registry, new Map<string, Promise<void>>());
	}

	return whenDefinedPromiseMap.get(registry) as Map<string, Promise<void>>;
};
