/**
 * @see https://dom.spec.whatwg.org/#concept-document-mode
 */
export type DocumentMode = 'no-quirks' | 'quirks' | 'limited-quirks';

const mode = new WeakMap<Document, DocumentMode>();

export const disposeModeOf = (document: Document) => {
	mode.delete(document);
};

export const isInNoQuirksMode = (document: Document) => {
	if (mode.has(document)) {
		return modeOf(document) === 'no-quirks';
	}

	return false;
};

export const isInQuirksMode = (document: Document) => {
	if (mode.has(document)) {
		return modeOf(document) === 'quirks';
	}

	return false;
};

export const isInLimitedQuirksMode = (document: Document) => {
	if (mode.has(document)) {
		return modeOf(document) === 'limited-quirks';
	}

	return false;
};

export const modeOf = (document: Document): DocumentMode => {
	return mode.get(document) || 'no-quirks';
};
