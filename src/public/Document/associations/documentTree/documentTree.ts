// import type { DocumentTree } from '#tree/DocumentTree';

/**
 * @see https://dom.spec.whatwg.org/#concept-tree
 */

const tree = new WeakMap<Document, object>();

export const documentTreeOf = (document: Document) => {
	return tree.get(document) || {};
};

export const disposeDocumentTreeOf = (document: Document) => {
	tree.delete(document);
};

export const setDocumentTreeOf = (document: Document, to: object) => {
	tree.set(document, to);
};
