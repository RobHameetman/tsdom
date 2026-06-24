import InUseAttributeError from '#errors/InUseAttributeError';
import getTrustedTypeCompliantAttributeValue from '#public/Attr/algorithms/getTrustedTypeCompliantAttributeValue';
import { elementOf } from '#public/Attr/associations/element';
import getAnAttributeByNamespaceAndLocalName from '#public/Element/attributes/getAnAttributeByNamespaceAndLocalName';
import append from '#public/Element/attributes/append';
import change from '#public/Element/attributes/change';
import { setLocalNameOf } from '#public/Attr/associations/localName';
import { setNamespaceOf } from '#public/Attr/associations/namespace';
import { setNamespacePrefixOf } from '#public/Attr/associations/namespacePrefix';
import { setValueOf } from '#public/Attr/associations/value';
import { setNodeDocumentOf } from '#public/Node/associations/nodeDocument';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-set-value
 */
export const setAnAttributeValue = (element: Element, localName: string, value: string, prefix = null as string | null, namespace = null as string | null) => {
	let attribute = getAnAttributeByNamespaceAndLocalName(namespace, localName, element);

	if (!attribute) {
		attribute = Object.create(Attr.prototype) as Attr;

		setNamespaceOf(attribute, namespace);
		setNamespacePrefixOf(attribute, prefix);
		setLocalNameOf(attribute, localName);
		setValueOf(attribute, value);
		setNodeDocumentOf(attribute, element.ownerDocument);

		append(attribute, element);

		return;
	}

	change(attribute, value);
};

export default setAnAttributeValue;
