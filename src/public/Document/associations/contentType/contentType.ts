/**
 * @see https://dom.spec.whatwg.org/#concept-document-content-type
 */
export type ContentType = string;

const contentType = new WeakMap<Document, ContentType>();

export const contentTypeOf = (document: Document) => {
	return contentType.get(document) || 'application/octet-stream';
};

export const disposeContentTypeOf = (document: Document) => {
	contentType.delete(document);
};

export const setContentTypeOf = (document: Document, to: ContentType) => {
	contentType.set(document, to);
};
