import { setElementOf } from '@/public/Attr/associations/element';
import { attributeListOf } from '@/public/Element/associations/attributeList';
import { setNodeDocumentOf } from '@/public/Node/associations/nodeDocument';
import handleAttributeChanges from '@/public/Element/attributes/handleAttributeChanges';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-append
 */
export const append = (attribute: Attr, element: Element) => {
	attributeListOf(element).append(attribute);
	setElementOf(attribute, element);
	setNodeDocumentOf(attribute, element.ownerDocument);
	handleAttributeChanges(attribute, element, null, attribute.value);
};

export default append;
