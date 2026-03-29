import getAnAttributeByNamespaceAndLocalName from '@/public/Element/attributes/getAnAttributeByNamespaceAndLocalName';
import remove from '@/public/Element/attributes/remove';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
 */
export const removeAnAttributeByNamespaceAndLocalName = (namespace: string | null, localName: string, element: Element) => {
	const attr = getAnAttributeByNamespaceAndLocalName(namespace, localName, element);

	if (attr) {
		remove(attr);
	}

	return attr;
};

export default removeAnAttributeByNamespaceAndLocalName;
