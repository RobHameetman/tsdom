import { setValueOf } from '#public/Attr/associations/value';
import { elementOf } from '#public/Attr/associations/element';
import handleAttributeChanges from '#public/Element/attributes/handleAttributeChanges';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-change
 */
export const change = (attribute: Attr, value: string) => {
	const oldValue = attribute.value;

	setValueOf(attribute, value);
	handleAttributeChanges(attribute, elementOf(attribute) as Element, oldValue, value);
};

export default change;
