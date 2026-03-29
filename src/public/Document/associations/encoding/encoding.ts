/**
 * An {@link Encoding} defines a mapping from a scalar value sequence to a byte
 * sequence (and vice versa).
 *
 * @see https://encoding.spec.whatwg.org/#encoding
 */
export interface Encoding {
	readonly name: string;
	readonly labels: Array<string>;
}

const encoding = new WeakMap<Document, Encoding>();

export const disposeEncodingOf = (document: Document) => {
	encoding.delete(document);
};

export const encodingOf = (document: Document): Encoding => {
	return encoding.get(document) || { name: 'UTF-8', labels: [] };
};

export const setEncodingOf = (document: Document, to: Encoding) => {
	encoding.set(document, to);
};
