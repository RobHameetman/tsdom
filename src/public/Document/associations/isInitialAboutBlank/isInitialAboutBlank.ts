/**
 * @see https://html.spec.whatwg.org/multipage/dom.html#is-initial-about:blank
 */
export type IsInitialAboutBlank = boolean;

const isInitialAboutBlank = new WeakMap<Document, IsInitialAboutBlank>();

export const isInitialAboutBlankOf = (document: Document) => {
	return isInitialAboutBlank.get(document) || false;
};

export const disposeIsInitialAboutBlankOf = (document: Document) => {
	isInitialAboutBlank.delete(document);
};

export const setIsInitialAboutBlankOf = (document: Document, to: IsInitialAboutBlank) => {
	isInitialAboutBlank.set(document, to);
};
