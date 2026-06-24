import { attributeListOf } from '#public/Element/associations/attributeList';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
 */
export const getAnAttributeByNamespaceAndLocalName = (namespace: string | null, localName: string, element: Element) => {
	if (namespace === '') {
		namespace = null;
	}

	return attributeListOf(element).find(
		(attr: Attr) => attr.namespaceURI === namespace && attr.localName === localName,
	) || null;
};

export default getAnAttributeByNamespaceAndLocalName;
