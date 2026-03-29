import getAnAttributeByNamespaceAndLocalName from '@/public/Element/attributes/getAnAttributeByNamespaceAndLocalName';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-value
 */
export const getAnAttributeValue = (element: Element, localName: string, namespace = null as string | null) => {
	const attr = getAnAttributeByNamespaceAndLocalName(namespace, localName, element);

	return !attr ? '' : attr.value;
};

export default getAnAttributeValue;
