/**
 * Determines whether the attribute lists of two {@link Element} nodes are not
 * equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A {@link Element} node to check.
 * @param other - Another {@link Element} node to compare with the first node.
 *
 * @returns A boolean which is `true` if any attribute in one node's attribute
 * list does not equal an attribute in the other node's attribute list, `false`
 * otherwise.
 */
const _attributeListIsntEqual = (node: Element, other: Element) =>
	Array.from(node.attributes).some(
		(attribute) => other.attributes.getNamedItemNS(attribute.namespaceURI, attribute.localName) === null,
	);

/**
 * Determines whether two {@link DocumentType} nodes are not equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A {@link DocumentType} node to check.
 * @param other - Another {@link DocumentType} node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are not equal, `false`
 * otherwise.
 */
const _docTypesArentEqual = (node: DocumentType, other: DocumentType) =>
	node.nodeName !== other.nodeName ||
	node.publicId !== other.publicId ||
	node.systemId !== other.systemId;

/**
 * Determines whether two {@link Element} nodes are not equal. This checks the
 * length but not equality of each node's attribute list, which is how the spec
 * defines the algorithm. The actual attribute lists are compared using the
 * {@link _attributeListIsntEqual()} function.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A {@link Element} node to check.
 * @param other - Another {@link Element} node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are not equal, `false`
 * otherwise.
 */
const _elementsArentEqual = (node: Element, other: Element) =>
	node.prefix !== other.prefix ||
	node.namespaceURI !== other.namespaceURI ||
	node.localName !== other.localName ||
	node.attributes.length !== other.attributes.length;

/**
 * Determines whether two {@link Attr} nodes are not equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A {@link Attr} node to check.
 * @param other - Another {@link Attr} node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are not equal, `false`
 * otherwise.
 */
const _attrsArentEqual = (node: Attr, other: Attr) =>
	node.localName !== other.localName ||
	node.namespaceURI !== other.namespaceURI ||
	node.value !== other.value;

/**
 * Determines whether two {@link ProcessingInstruction} nodes are not equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A {@link ProcessingInstruction} node to check.
 * @param other - Another {@link ProcessingInstruction} node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are not equal, `false`
 * otherwise.
 */
const _processingInsturctionsArentEqual = (node: ProcessingInstruction, other: ProcessingInstruction) =>
	node.target !== other.target ||
	node.data !== other.data;

/**
 * Determines whether two nodes are equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-equals
 *
 * @param node - A node to check.
 * @param other - Another node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are equal, `false`
 * otherwise.
 */
export const equals = (node: Node, other: Node): boolean => {
	if (node.nodeType !== other.nodeType) {
		return false;
	}

	switch (node.nodeType) {
		case Node.DOCUMENT_TYPE_NODE:
			if (_docTypesArentEqual(node as DocumentType, other as DocumentType)) {
				return false;
			}

			break;
		case Node.ELEMENT_NODE:
			if (_elementsArentEqual(node as Element, other as Element)) {
				return false;
			}

			break;
		case Node.ATTRIBUTE_NODE:
			if (_attrsArentEqual(node as Attr, other as Attr)) {
				return false;
			}

			break;
		case Node.PROCESSING_INSTRUCTION_NODE:
			if (_processingInsturctionsArentEqual(node as ProcessingInstruction, other as ProcessingInstruction)) {
				return false;
			}

			break;
		case Node.TEXT_NODE:
		// case Node.CDATA_SECTION_NODE: // not listed in the spec but seems logical to include
		case Node.COMMENT_NODE:
			if ((node as CharacterData).data !== (other as CharacterData).data) {
				return false;
			}

			break;
		default:
			break;
	}

	if (node instanceof Element && _attributeListIsntEqual(node as Element, other as Element)) {
		return false;
	}

	if (node.childNodes.length !== other.childNodes.length) {
		return false;
	}

	for (let i = 0; i < node.childNodes.length; i += 1) {
		const child = node.childNodes[i];
		const otherChild = other.childNodes[i];

		if (!Boolean(child) || !Boolean(otherChild) || !equals(child, otherChild)) {
			return false;
		}
	}

	return true;

	// return !node.childNodes.entries().some(([index, child]) =>
	// 	equals(child, other.childNodes[index]),
	// );
};

export default equals;
