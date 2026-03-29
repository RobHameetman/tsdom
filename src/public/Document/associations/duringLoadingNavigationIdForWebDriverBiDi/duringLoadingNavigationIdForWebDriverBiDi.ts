/**
 * @see https://html.spec.whatwg.org/multipage/browsing-the-web.html#navigation-id
 */
export type NavigationId = string;

/**
 * @see https://html.spec.whatwg.org/multipage/dom.html#concept-document-navigation-id
 */
const duringLoadingNavigationIdForWebDriverBiDi = new WeakMap<Document, NavigationId | null>();

export const duringLoadingNavigationIdForWebDriverBiDiOf = (document: Document) => {
	return duringLoadingNavigationIdForWebDriverBiDi.get(document) || null;
};

export const disposeDuringLoadingNavigationIdForWebDriverBiDiOf = (document: Document) => {
	duringLoadingNavigationIdForWebDriverBiDi.delete(document);
};

export const initializeDuringLoadingNavigationIdForWebDriverBiDiOf = (document: Document) => {
	if (!duringLoadingNavigationIdForWebDriverBiDi.has(document)) {
		duringLoadingNavigationIdForWebDriverBiDi.set(document, null);
	}
};

export const setDuringLoadingNavigationIdForWebDriverBiDiOf = (document: Document, to: NavigationId | null) => {
	duringLoadingNavigationIdForWebDriverBiDi.set(document, to);
};
