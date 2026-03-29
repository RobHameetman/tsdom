/**
 * @see https://dom.spec.whatwg.org/#concept-document-origin
 */
export type DocumentOrigin = URL['origin'];

const origin = new WeakMap<Document, DocumentOrigin>();

export const disposeOriginOf = (document: Document) => {
	origin.delete(document);
};

export const initializeOriginOf = (document: Document) => {
	if (!origin.has(document)) {
		setOriginOf(document, originOf(globalThis.document));
	}
};

export const originOf = (document: Document) => {
	return origin.get(document) || '';
};

export const setOriginOf = (document: Document, to: DocumentOrigin) => {
	origin.set(document, to);
};
