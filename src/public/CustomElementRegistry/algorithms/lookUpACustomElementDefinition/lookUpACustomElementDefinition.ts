import Namespace from '#enums/Namespace';
import { customElementDefinitionSetOf } from '#public/CustomElementRegistry/associations/customElementDefinitionSet';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#look-up-a-custom-element-definition
 */
export const lookUpACustomElementDefinition = (registry: CustomElementRegistry | null, namespace: string | null, localName: string, is: string | null) => {
	if (registry === null) {
		return null;
	}

	if (namespace !== Namespace.Html) {
		return null;
	}

	let definition = customElementDefinitionSetOf(registry).find((definition) => definition.name === localName && definition.localName === localName);

	if (definition) {
		return definition;
	}

	definition = customElementDefinitionSetOf(registry).find((definition) => definition.name === localName);

	return definition || null;
};

export default lookUpACustomElementDefinition;
