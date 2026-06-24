import InUseAttributeError from '#errors/InUseAttributeError';
import getTrustedTypeCompliantAttributeValue from '#public/Attr/algorithms/getTrustedTypeCompliantAttributeValue';
import { setValueOf } from '#public/Attr/associations/value';
import { elementOf } from '#public/Attr/associations/element';
import getAnAttributeByNamespaceAndLocalName from '#public/Element/attributes/getAnAttributeByNamespaceAndLocalName';
import append from '#public/Element/attributes/append';
import replace from '#public/Element/attributes/replace';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
 */
export const setAnAttribute = (attr: Attr, element: Element) => {
	const verifiedValue = getTrustedTypeCompliantAttributeValue(attr.localName, attr.namespaceURI as string, element, attr.value);

	if (elementOf(attr) !== null && elementOf(attr) !== element) {
		throw new InUseAttributeError({}, '', '');
	}

	const oldAttr = getAnAttributeByNamespaceAndLocalName(attr.namespaceURI, attr.localName, element);

	if (oldAttr?.isSameNode(attr)) {
		return attr;
	}

	setValueOf(attr, verifiedValue);

	if (oldAttr) {
		replace(oldAttr, attr);
	} else {
		append(attr, element);
	}

	return oldAttr;
};

export default setAnAttribute;
