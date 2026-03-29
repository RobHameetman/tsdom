/**
 * @see https://dom.spec.whatwg.org/#concept-document-type
 */
const type = new WeakMap<Document, 'xml' | 'html'>();

export const disposeTypeOf = (document: Document) => {
	type.delete(document);
};

export const initializeTypeOf = (document: Document, docType: 'xml' | 'html') => {
	if (!type.has(document)) {
		type.set(document, docType);
	}
};

export const isAnHTMLDocument = (document: Document) => {
	return type.get(document) === 'html';
};

export const isAnXMLDocument = (document: Document) => {
	return type.get(document) === 'xml';
};
