import getTrustedTypeDataForAttribute from '#public/Attr/algorithms/getTrustedTypeDataForAttribute';

/**
 * @see https://dom.spec.whatwg.org/#set-an-existing-attribute-value
 */
export const getTrustedTypeCompliantAttributeValue = (attributeName: string, attributeNs: string, element: Element, newValue: TrustedType | string) => {
	if (!attributeNs.length) {
		attributeNs = null;
	}

	const attributeData = getTrustedTypeDataForAttribute(element, attributeName, attributeNs);

	if (attributeData === null) {
		if (typeof newValue === 'string') {
			return newValue;
		}

		return newValue.toJSON();
	}

	const [ _element, _attrNs, _attrLocalName, expectedType, sink ] = attributeData;

	return getTrustedTypeCompliantString(expectedType, newValue, globalThis, sink, 'script');
};

export default getTrustedTypeCompliantAttributeValue;
