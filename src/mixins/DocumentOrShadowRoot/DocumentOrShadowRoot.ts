import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';

export const DocumentOrShadowRoot = <T extends Node | DocumentFragment = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		activeElement: {
			get(this: T & DocumentOrShadowRoot) {
				return null;
			},
			configurable: true,
			enumerable: true,
		},
		adoptedStyleSheets: {
			get(this: T & DocumentOrShadowRoot) {
				return [];
			},
			set(this: T & DocumentOrShadowRoot, _value: Array<CSSStyleSheet>) {
				/**
				 * @TODO
				 */
			},
			configurable: true,
			enumerable: true,
		},
		fullScreenElement: {
			get(this: T & DocumentOrShadowRoot) {
				return null;
			},
			configurable: true,
			enumerable: true,
		},
		pictureInPictureElement: {
			get(this: T & DocumentOrShadowRoot) {
				return null;
			},
			configurable: true,
			enumerable: true,
		},
		pointerLockElement: {
			get(this: T & DocumentOrShadowRoot) {
				return null;
			},
			configurable: true,
			enumerable: true,
		},
		styleSheets: {
			get(this: T & DocumentOrShadowRoot) {
				return [] as StyleSheetList;
			},
			configurable: true,
			enumerable: true,
		},
		elementFromPoint: {
			value(
				this: T & DocumentOrShadowRoot,
				_x: number,
				_y: number,
			): Element | null {
				return null;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		elementsFromPoint: {
			value(
				this: T & DocumentOrShadowRoot,
				_x: number,
				_y: number,
			): Array<Element> {
				return [];
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		getAnimations: {
			value(
				this: T & DocumentOrShadowRoot,
				_options?: GetAnimationsOptions,
			): Array<Animation> {
				return [];
			},
			configurable: true,
			enumerable: true,
			writable: true,
		}
	}) as T & DocumentOrShadowRoot;

/**
 * Checks that an `unknown` value is an {@link Node} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Node} node.
 */
export const isDocumentOrShadowRoot = (
	value: unknown,
): value is DocumentOrShadowRoot =>
	/**
	 * value
	 */
	(!isUndefined(window) && value instanceof Node) ||
		(isObject(value) &&
			/**
			 * value.assignedSlot
			 */
			'assignedSlot' in value &&
			(isHTMLSlotElement(value.assignedSlot) || value.assignedSlot === null));

export default DocumentOrShadowRoot;
