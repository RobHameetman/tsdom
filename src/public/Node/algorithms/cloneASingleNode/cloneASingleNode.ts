import createAnElement from '#public/Element/algorithms/createAnElement';
import { isValueOf } from '#public/Element/associations/isValue';
import { setNodeDocumentOf } from '#public/Node/associations/nodeDocument';

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
export const cloneASingleNode = (node: Node, document: Document, fallbackRegistry = null as CustomElementRegistry | null) => {
	let copy = null as Node | null;

	if (node instanceof Element) {
		let registry = node.ownerDocument.defaultView?.customElements || null;

		if (!registry) {
			registry = fallbackRegistry;
		}

		if (registry instanceof CustomElementRegistry) {
			registry = document.defaultView?.customElements || registry;
		}

		copy = createAnElement(document, node.localName, node.namespaceURI, node.prefix, isValueOf(node), false, registry);

		Array.from(node.attributes).forEach((attr) => {
			const copyAttribute = cloneASingleNode(attr, document, fallbackRegistry) as Attr;

			// (copy as Element).setAttributeNode(copyAttribute); // append attribute to element's attribute list
		});
	} else {
		/**
		 * @TODO Step 3.
		 */
	}

	if (node instanceof Document) {
		document = copy as Document;
	}

	setNodeDocumentOf(copy as Node, document);

	return copy;
};

export default cloneASingleNode;
