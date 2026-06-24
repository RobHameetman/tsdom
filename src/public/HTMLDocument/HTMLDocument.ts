import Document from '#public/Document';

export const HTMLDocument = function(this: HTMLDocument) {
	throw new TypeError('Failed to construct \'HTMLDocument\': Illegal constructor');
} as unknown as typeof global.HTMLDocument;

// export const HTMLDocument = implOf<typeof global.HTMLDocument>(
// 	function HTMLDocument(this: HTMLDocument) {
// 		return Document.call(this);
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(HTMLDocument, {
	prototype: {
		value: Object.seal(Object.create(Document.prototype, {
			constructor: {
				value: HTMLDocument,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: HTMLDocument) {
					if (Symbol.dispose in HTMLElement.prototype) {
						(HTMLElement.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: HTMLDocument) {
					if (Symbol.asyncDispose in HTMLElement.prototype) {
						await (HTMLElement.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'HTMLDocument',
				configurable: true,
			},
		})),
	},
});

Object.seal(HTMLDocument);

if (!globalThis.HTMLDocument) {
	globalThis.HTMLDocument = HTMLDocument;
}

if (!globalThis.document) {
	const $document = Object.create(HTMLDocument.prototype) as HTMLDocument;

	// /* @ts-expect-error - Expected 1 arguments, but got 2. */
	// HTMLDocument.call($document, HTML_CONSTRUCTOR_KEY);

	globalThis.document = $document;
}

/**
 * Checks that an `unknown` value is an {@link HTMLDocument}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link HTMLDocument} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link HTMLDocument}.
 */
export const isHTMLDocument = (value: unknown): value is HTMLDocument =>
	typeof globalThis.HTMLDocument !== 'undefined' &&
	value instanceof globalThis.HTMLDocument;

export default HTMLDocument;
