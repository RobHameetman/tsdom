/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#element-definition-is-running
 */
const elementDefinitionIsRunning = new WeakMap<CustomElementRegistry, boolean>();

export const disposeElementDefinitionIsRunningOf = (registry: CustomElementRegistry) => {
	elementDefinitionIsRunning.delete(registry);
};

export const elementDefinitionIsRunningOf = (registry: CustomElementRegistry) => {
	return elementDefinitionIsRunning.get(registry) ?? false;
};

export const setElementDefinitionIsRunningOf = (registry: CustomElementRegistry, value: boolean) => {
	elementDefinitionIsRunning.set(registry, value);
};
