import getAnAttributeByName from '#public/Element/attributes/getAnAttributeByName';
import remove from '#public/Element/attributes/remove';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
 */
export const removeAnAttributeByName = (qualifiedName: string, element: Element) => {
	const attr = getAnAttributeByName(qualifiedName, element);

	if (attr !== null) {
		remove(attr);
	}

	return attr;
};

export default removeAnAttributeByName;
