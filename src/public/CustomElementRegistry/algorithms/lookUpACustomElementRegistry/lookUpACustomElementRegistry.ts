import { customElementRegistryOf as documentCustomElementRegistryOf } from '#public/Document/associations/customElementRegistry';
import { customElementRegistryOf } from '#public/Element/associations/customElementRegistry';
import { customElementRegistryOf as shadowRootCustomElementRegistryOf } from '#public/ShadowRoot/associations/customElementRegistry';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#look-up-a-custom-element-registry
 */
export const lookUpACustomElementRegistry = (node: Node) => {
	if (node instanceof Element) {
		return customElementRegistryOf(node);
	}

	if (node instanceof ShadowRoot) {
		return shadowRootCustomElementRegistryOf(node)
	}

	if (node instanceof Document) {
		return documentCustomElementRegistryOf(node);
	}

	return null;
};

export default lookUpACustomElementRegistry;
