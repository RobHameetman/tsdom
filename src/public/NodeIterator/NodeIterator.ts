import implOf from '#_internals/impl';
import traverse from '#public/NodeIterator/algorithms/traverse';
import { disposeFilterOf, filterOf, initializeFilterOf } from '#public/NodeIterator/associations/filter';
import { disposeIteratorCollectionOf } from '#public/NodeIterator/associations/iteratorCollection';
import { disposePointerBeforeReferenceOf, pointerBeforeReferenceOf } from '#public/NodeIterator/associations/pointerBeforeReference';
import { disposeReferenceOf, referenceOf } from '#public/NodeIterator/associations/reference';
import { disposeRootOf, rootOf } from '#public/NodeIterator/associations/root';
import { disposeWhatToShowOf, whatToShowOf } from '#public/NodeIterator/associations/whatToShow';

/**
 * {@link NodeIterator} objects can be used to filter and traverse node trees.
 */
export const NodeIterator = implOf<typeof global.NodeIterator>(
	function NodeIterator(this: NodeIterator) {
		return this;
	}, {
		onInit: (instance: NodeIterator) => {
			initializeFilterOf(instance, { acceptNode: () => NodeFilter.FILTER_ACCEPT });
		},
	},
);

/**
 * Checks that an `unknown` value is an {@link NodeIterator}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `NodeIterator`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link NodeIterator}.
 */
export const isNodeIterator = (value: unknown): value is NodeIterator =>
	value instanceof NodeIterator;

Object.defineProperties(NodeIterator, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-filter
			 */
			filter: {
				get(this: NodeIterator) {
					return filterOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-pointerbeforereferencenode
			 */
			pointerBeforeReferenceNode: {
				get(this: NodeIterator) {
					return pointerBeforeReferenceOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-referencenode
			 */
			referenceNode: {
				get(this: NodeIterator) {
					return referenceOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-root
			 */
			root: {
				get(this: NodeIterator) {
					return rootOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-whattoshow
			 */
			whatToShow: {
				get(this: NodeIterator) {
					return whatToShowOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @deprecated
			 * This functionality (disabling a NodeIterator object) was
			 * removed, but the method itself is preserved for compatibility.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-detach
			 */
			detach: {
				value(this: NodeIterator) {
					/**
					 * The `detach()` method steps are to do nothing.
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-nextnode
			 */
			nextNode: {
				value(this: NodeIterator) {
					traverse(this, 'next');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-nodeiterator-previousnode
			 */
			previousNode: {
				value(this: NodeIterator) {
					traverse(this, 'previous');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: NodeIterator,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: NodeIterator) {
					disposePointerBeforeReferenceOf(this);
					disposeIteratorCollectionOf(this);
					disposeReferenceOf(this);
					disposeWhatToShowOf(this);
					disposeFilterOf(this);
					disposeRootOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'NodeIterator',
				configurable: true,
			},
		})),
	},
});

Object.seal(NodeIterator);

if (!globalThis.NodeIterator) {
	globalThis.NodeIterator = NodeIterator;
}

export default NodeIterator;
