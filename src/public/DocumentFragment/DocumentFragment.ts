// import implOf from '@/_internals/impl';
import { isSlottable } from '@/mixins/Slottable';
import { setGetTheParentOf } from '@/public/EventTarget/associations/getTheParent';
import Node from '@/public/Node';
import NonElementParentNode, { asNonElementParentNode } from '@/mixins/NonElementParentNode';
import ParentNode, { asParentNode } from '@/mixins/ParentNode';
import { initializeNodeDocumentOf } from '@/public/Node/associations/nodeDocument';

/**
 * @TODO - Move this probably
 */
const ELEMENTS_BY_ID = new Map<string, Element>();

const withMixins = (prototype: DocumentFragment) =>
	asParentNode(
		asNonElementParentNode(prototype),
	);

/**
 * Represents a minimal document object that has no parent.
 */
export const DocumentFragment = function(this: DocumentFragment) {
	initializeNodeDocumentOf(this, document);

	setGetTheParentOf(this, (_event: Event) => {
		if (isSlottable(this) && this.assignedSlot !== null) {
			return this.assignedSlot as EventTarget;
		}

		return this.parentNode as EventTarget;
	});
} as unknown as typeof global.DocumentFragment;

// export const DocumentFragment = implOf<typeof global.DocumentFragment>(
// 	function DocumentFragment(this: DocumentFragment) {
// 		/* @ts-expect-error - Expected 1 arguments, but got 3. */
// 		Node.call(this, DomNodeType.DOCUMENT_FRAGMENT_NODE, NODE_CONSTRUCTOR_KEY);

// 		ParentNode.call(this);
// 		NonElementParentNode.call(this);

// 		host.set(this, null);

// 		return this;
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(DocumentFragment, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Node.prototype, {
			ownerDocument: {
				get(this: DocumentFragment) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			textContent: {
				get(this: DocumentFragment) {
					return this.nodeValue;
				},
				set(value: string | null) {
					this.nodeValue = value ?? '';
				},
				configurable: true,
				enumerable: true,
			},
			getElementById: {
				value(this: DocumentFragment, id: string) {
					return ELEMENTS_BY_ID.get(id) || null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: DocumentFragment,
				configurable: true,
				enumerable: false,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: DocumentFragment) {
					if (Symbol.dispose in Node.prototype) {
						(Node.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: DocumentFragment) {
					if (Symbol.asyncDispose in Node.prototype) {
						await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'DocumentFragment',
				configurable: true,
			},
		}))),
	},
});

/**
 * Checks that an `unknown` value is a {@link DocumentFragment}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link DocumentFragment} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link DocumentFragment}.
 */
export const isDocumentFragment = (value: unknown): value is DocumentFragment =>
	typeof globalThis.DocumentFragment !== 'undefined' &&
	value instanceof globalThis.DocumentFragment;

export default DocumentFragment;
