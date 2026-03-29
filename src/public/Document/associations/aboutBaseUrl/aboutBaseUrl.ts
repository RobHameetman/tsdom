/**
 * @see https://html.spec.whatwg.org/multipage/dom.html#concept-document-about-base-url
 */
const aboutBaseUrl = new WeakMap<Document, URL | null>();

export const disposeAboutBaseUrlOf = (document: Document) => {
	aboutBaseUrl.delete(document);
};

export const initializeAboutBaseUrlOf = (document: Document) => {
	if (!aboutBaseUrl.has(document)) {
		aboutBaseUrl.set(document, new URL('about:blank'));
	}
};

export const aboutBaseUrlOf = (document: Document) => {
	return aboutBaseUrl.get(document) || new URL('about:blank');
};

export const setAboutBaseUrlOf = (document: Document, value: URL | null) => {
	aboutBaseUrl.set(document, value);
};
