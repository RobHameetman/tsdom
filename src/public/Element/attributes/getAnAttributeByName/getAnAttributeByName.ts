import Namespace from '#enums/Namespace';
import { qualifiedNameOf } from '#public/Attr/associations/qualifiedName';
import { attributeListOf } from '#public/Element/associations/attributeList';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
 */
export const getAnAttributeByName = (qualifiedName: string, element: Element) => {
	if (element.namespaceURI === Namespace.Html && element.ownerDocument instanceof HTMLDocument) {
		qualifiedName = qualifiedName.toLowerCase();
	}

	return attributeListOf(element).find(
		(attr: Attr) => qualifiedNameOf(attr) === qualifiedName,
	) || null;
};

export default getAnAttributeByName;
