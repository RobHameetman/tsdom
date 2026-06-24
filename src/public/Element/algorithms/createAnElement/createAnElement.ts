import lookUpACustomElementDefinition from '#public/CustomElementRegistry/algorithms/lookUpACustomElementDefinition';
import lookUpACustomElementRegistry from '#public/CustomElementRegistry/algorithms/lookUpACustomElementRegistry';

/**
 * @see https://dom.spec.whatwg.org/#concept-create-element
 */
export const createAnElement = (
	document: Document,
	localName: string,
	namespace: string | null,
	prefix = null as string | null,
	is = null as string | null,
	synchronousCustomElements = false,
	registry = 'default' as 'default' | CustomElementRegistry | null,
) => {
	let result = null;

	if (registry === 'default') {
		registry = lookUpACustomElementRegistry(document);
	}

	let definition = lookUpACustomElementDefinition(registry, namespace, localName, is);

	if (definition && definition.name !== definition.localName) {
		//
	} else if (definition) {
		//
	} else {
		//
	}

	return result;
};

export default createAnElement;
