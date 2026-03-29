/**
 * @see https://html.spec.whatwg.org/multipage/nav-history-apis.html#concept-document-window
 */
export const document = new WeakMap<Window, Document>();

export const documentOf = (window: Window) => {
	return document.get(window) as Document;
};

export const setDocumentOf = (window: Window, to: Document) => {
	document.set(window, to);
};
