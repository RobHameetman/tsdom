import { DomNodeNamespace, isUndefined, noop } from '@com.robhameetman/utils';
// import implOf from '@/_internals/impl';
import type { Slot } from '@/tree/ShadowTree/types/Slot'
import HTMLElement from '@/public/HTMLElement';
import manuallyAssignedNodes from '@/public/HTMLSlotElement/associations/manuallyAssignedNodes';
import manuallyAssignedSlot from '@/mixins/Slottable/associations/manuallyAssignedSlot';

// export type Slot = HTMLSlotElement;

export const HTMLSlotElement = function(this: HTMLSlotElement) {
	throw new TypeError('Failed to construct \'HTMLSlotElement\': Illegal constructor');
} as unknown as typeof global.HTMLSlotElement;

// export const HTMLSlotElement = implOf<typeof global.HTMLSlotElement>(
// 	function HTMLSlotElement(this: HTMLSlotElement) {
// 		// if (_key !== HTML_ELEMENT_CONSTRUCTOR_KEY) {
// 		// 	throw new TypeError('Failed to construct \'HTMLSlotElement\': Illegal constructor');
// 		// }

// 		// /* @ts-expect-error - Expected 1 arguments, but got 4. */
// 		// HTMLElement.call(this, DomNodeNamespace.HTML, null, 'a', {}, HTML_ELEMENT_CONSTRUCTOR_KEY);

// 		return HTMLElement.call(this);
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(HTMLSlotElement, {
	prototype: {
		value: Object.seal(Object.create(HTMLElement.prototype, {
			name: {
				get(this: HTMLSlotElement) {
					return this.nodeName;
				},
				set(this: HTMLSlotElement, value: string) {
					this.nodeName = value;
				},
				configurable: true,
				enumerable: true,
			},
			assign: {
				value(this: HTMLSlotElement, ...nodes: Array<Element | Text>) {
					/**
					 * 1. For each node of this's manually assigned nodes, set node's manual
					 * slot assignment to null.
					 */
					const _manuallyAssignedNodes = manuallyAssignedNodes.get(this);

					_manuallyAssignedNodes?.forEach((node) => {
						manuallyAssignSlot(node, null);
					});

					let nodeSet = new WeakSet();

					nodes.forEach((node) => {
						if (node.assignedSlot !== null) {

						}
					});

					for (const node of nodes) {
						/**
						 * 1. If node's manual slot assignment refers to a slot, then remove
						 * node from that slot's manually assigned nodes.
						 */
						node.assignedSlot = this;
						nodeSet.add(node);
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: HTMLSlotElement,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: HTMLSlotElement) {
					if (Symbol.dispose in HTMLElement.prototype) {
						(HTMLElement.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: HTMLSlotElement) {
					if (Symbol.asyncDispose in HTMLElement.prototype) {
						await (HTMLElement.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'HTMLSlotElement',
				configurable: true,
			}
		})),
	},
});

Object.seal(HTMLSlotElement);

if (!globalThis.HTMLSlotElement) {
	globalThis.HTMLSlotElement = HTMLSlotElement;
}

/**
 * Checks that an `unknown` value is an {@link HTMLSlotElement}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link HTMLSlotElement} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link HTMLSlotElement}.
 */
export const isHTMLSlotElement = (value: unknown): value is HTMLSlotElement =>
	typeof globalThis.HTMLSlotElement !== 'undefined' &&
	value instanceof globalThis.HTMLSlotElement;

/**
 * Checks that an `unknown` value is an element that is a {@link Slot}.
 *
 * Requirements:
 *   - `value` must be an {@link HTMLSlotElement}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an element that is a {@link Slot}.
 */
export const isSlot = (value: unknown): value is Slot =>
	isHTMLSlotElement(value);

export const assertIsASlot = (_value: unknown): _value is Slot =>
	true;

export const asSlot = (_value: unknown): Slot =>
	_value as Slot;

export default HTMLSlotElement;
