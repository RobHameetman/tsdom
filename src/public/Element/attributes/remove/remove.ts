import { elementOf, setElementOf } from '@/public/Attr/associations/element';
import { attributeListOf } from '@/public/Element/associations/attributeList';
import handleAttributeChanges from '@/public/Element/attributes/handleAttributeChanges';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove
 */
export const remove = (attribute: Attr) => {
	const element = elementOf(attribute) as Element;

	attributeListOf(element).remove((attr) => attr === attribute);
	setElementOf(attribute, null);
	handleAttributeChanges(attribute, element, attribute.value, null);
};

export default remove;
