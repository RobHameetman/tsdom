import { elementOf, elementIsNullOf } from '@/public/Attr/associations/element';
import { setValueOf } from '@/public/Attr/associations/value';
import getTrustedTypeCompliantAttributeValue from '@/public/Attr/algorithms/getTrustedTypeCompliantAttributeValue';

/**
 * Sets the value of an existing attribute.
 *
 * @see https://dom.spec.whatwg.org/#set-an-existing-attribute-value
 *
 * @param attribute - The attribute to set the value of.
 * @param value - The value to set.
 */
export const setAnExistingAttributeValue = (attribute: Attr, value: string) => {
	if (elementIsNullOf(attribute)) {
		setValueOf(attribute, value);

		return;
	}

	const element = elementOf(attribute) as Element;
	const verifiedValue = getTrustedTypeCompliantAttributeValue(attribute.localName, attribute.namespaceURI ?? '', element, value)

	if (elementOf(attribute) === null) {
		setValueOf(attribute, verifiedValue);

		return;
	}

	/**
	 * {@link change()} `attribute` to `verifiedValue`.
	 */
	setValueOf(attribute, verifiedValue);
};

export default setAnExistingAttributeValue;
