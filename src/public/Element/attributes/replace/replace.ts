import { elementOf, setElementOf } from '@/public/Attr/associations/element';
import { attributeListOf } from '@/public/Element/associations/attributeList';
import handleAttributeChanges from '@/public/Element/attributes/handleAttributeChanges';
import { setNodeDocumentOf } from '@/public/Node/associations/nodeDocument';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-replace
 */
export const replace = (oldAttribute: Attr, newAttribute: Attr) => {
	const element = elementOf(oldAttribute) as Element;

	attributeListOf(element).replace((attr) => attr === oldAttribute, newAttribute)	;
	setElementOf(newAttribute, element);
	setNodeDocumentOf(newAttribute, element.ownerDocument);
	setElementOf(oldAttribute, null);

	handleAttributeChanges(oldAttribute, element, oldAttribute.value, newAttribute.value);
};

export default replace;
