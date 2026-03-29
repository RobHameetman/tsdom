/**
 * @see https://dom.spec.whatwg.org/#concept-document-url
 */
export type DocumentURL = URL;

const url = new WeakMap<Document, DocumentURL>();

export const disposeUrlOf = (document: Document) => {
	url.delete(document);
};

export const initializeUrlOf = (document: Document) => {
	if (!url.has(document)) {
		url.set(document, new URL('about:blank'));
	}
};

export const urlOf = (document: Document) => {
	return url.get(document) || new URL('about:blank');
};

export const setUrlOf = (document: Document, documentURL: DocumentURL) => {
	url.set(document, documentURL);
};
