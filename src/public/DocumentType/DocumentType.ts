// import implOf from '#_internals/impl';
import Node from '#public/Node';
import ChildNode, { asChildNode } from '#mixins/ChildNode';

const withMixins = (prototype: DocumentType) =>
	asChildNode(prototype);

/**
 * Checks that an `unknown` value is a {@link DocumentType}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link DocumentType}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link DocumentType}.
 */
export const isDocumentType = (value: unknown): value is DocumentType =>
	typeof globalThis.DocumentType !== 'undefined' &&
	value instanceof globalThis.DocumentType;

/**
 * Represents a minimal document object that has no parent.
 */
export const DocumentType = function(this: DocumentType) {
	throw new TypeError('Failed to construct \'DocumentType\': Illegal constructor');
} as unknown as typeof global.DocumentType;

// export const DocumentType = implOf<typeof global.DocumentType>(
// 	function DocumentType(this: DocumentType) {
// 		// /* @ts-expect-error - Expected 1 arguments, but got 3. */
// 		// Node.call(this, DomNodeType.DOCUMENT_FRAGMENT_NODE, NODE_CONSTRUCTOR_KEY);

// 		ChildNode.call(this);

// 		return this;
// 	}, {
// 		onInit(instance: DocumentType) {
// 		},
// 	},
// );

Object.defineProperties(DocumentType, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Node.prototype, {
			/**
			 * The read-only **`name`** property of the {@link DocumentType} returns
			 * the type of the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/DocumentType/name
			 */
			name: {
				get(this: DocumentType) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},
			ownerDocument: {
				get(this: DocumentType) {
					return globalThis.document;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`publicId`** property of the {@link DocumentType}
			 * returns a formal identifier of the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/DocumentType/publicId
			 */
			publicId: {
				get(this: DocumentType) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`systemId`** property of the {@link DocumentType}
			 * returns the URL of the associated DTD.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/DocumentType/systemId
			 */
			systemId: {
				get(this: DocumentType) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
			 */
			textContent: {
				get(this: DocumentType) {
					return this.nodeValue;
				},
				set(value: string | null) {
					this.nodeValue = value ?? '';
				},
				configurable: true,
				enumerable: true,
			},
			constructor: {
				value: DocumentType,
				configurable: true,
				enumerable: false,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: DocumentType) {
					if (Symbol.dispose in Node.prototype) {
						(Node.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: DocumentType) {
					if (Symbol.asyncDispose in Node.prototype) {
						await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'DocumentType',
				configurable: true,
			},
		}))),
	},
});

Object.seal(DocumentType);

if (!globalThis.DocumentType) {
	globalThis.DocumentType = DocumentType;
}

export default DocumentType;
