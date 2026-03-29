import OrderedSet from '@/infra/OrderedSet';
import type { CustomElementDefinition } from '@/public/Element/associations/customElementDefinition';
import { disposeCustomElementDefinitionOf } from '../../../Element/associations/customElementDefinition/customElementDefinition';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-definition-set
 */
const customElementDefinitionSet = new WeakMap<CustomElementRegistry, OrderedSet<CustomElementDefinition>>();

export const customElementConstructorOf = (registry: CustomElementRegistry, name: string) => {
	return customElementDefinitionSetOf(registry).find((definition) => definition.name === name)?.constructor as CustomElementConstructor;
};

export const customElementDefinitionSetHasConstructor = (registry: CustomElementRegistry, constructor: CustomElementConstructor) => {
	return customElementDefinitionSetOf(registry).some((definition) => definition.constructor === constructor);
};

export const customElementDefinitionSetHasName = (registry: CustomElementRegistry, name: string) => {
	return customElementDefinitionSetOf(registry).some((definition) => definition.name === name);
};

export const customElementDefinitionSetOf = (registry: CustomElementRegistry) => {
	if (!customElementDefinitionSet.has(registry)) {
		customElementDefinitionSet.set(registry, new OrderedSet<CustomElementDefinition>());
	}

	return customElementDefinitionSet.get(registry) as OrderedSet<CustomElementDefinition>;
};

export const customElementNameOf = (registry: CustomElementRegistry, constructor: CustomElementConstructor) => {
	return customElementDefinitionSetOf(registry).find((definition) => definition.constructor === constructor)?.name as string;
};

export const disposeCustomElementDefinitionSetOf = (registry: CustomElementRegistry) => {
	customElementDefinitionSet.delete(registry);
};
