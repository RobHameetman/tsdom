/**
 * Each node has an associated node document, set upon creation, that is a
 * {@link Document}.
 *
 * @see https://dom.spec.whatwg.org/#concept-node-document
 */
export type NodeDocument = Document;

const nodeDocument = new WeakMap<Node, Document>();

export const disposeNodeDocumentOf = (node: Node) => {
	nodeDocument.delete(node);
};

export const initializeNodeDocumentOf = (node: Node, document: Document) => {
	if (!nodeDocument.has(node)) {
		nodeDocument.set(node, document);
	}
};

export const nodeDocumentOf = (node: Node) => {
	return nodeDocument.get(node) as Document;
};

export const setNodeDocumentOf = (node: Node, document: Document) => {
	nodeDocument.set(node, document);
};
