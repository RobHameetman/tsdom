import { attributeListOf } from '@/public/Element/associations/attributeList';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attribute-has
 */
export const has = (element: Element, attribute: Attr) => {
	return attributeListOf(element).contains(attribute);
};

export default has;
