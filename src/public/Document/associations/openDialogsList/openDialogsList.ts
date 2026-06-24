import List from '#infra/List';

/**
 * @see https://html.spec.whatwg.org/multipage/dom.html#open-dialogs-list
 */
const openDialogsList = new WeakMap<Document, List<HTMLDialogElement>>();

export const disposeOpenDialogsListOf = (document: Document) => {
	openDialogsList.delete(document);
};

export const initializeOpenDialogsListOf = (document: Document) => {
	if (!openDialogsList.has(document)) {
		openDialogsList.set(document, new List());
	}
};

export const openDialogsListOf = (document: Document) => {
	return openDialogsList.get(document) || new List();
};
