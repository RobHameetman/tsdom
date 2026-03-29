/**
 * The document element of a {@link Document} is the {@link Element} whose
 * parent is that {@link Document}, if it exists; otherwise null.
 *
 * @see https://dom.spec.whatwg.org/#document-element
 */
export const documentElement = new WeakMap<Document, Element | null>();

export const documentElementOf = (document: Document) => {
	return documentElement.get(document) || null;
};

export const initializeDocumentElementOf = (document: Document) => {
	if (!documentElement.has(document)) {
		setDocumentElementOf(document, null);
	}
};

export const setDocumentElementOf = (document: Document, element: Element | null) => {
	documentElement.set(document, element);
};
