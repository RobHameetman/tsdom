import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import DomNodeType, { isDomNodeType } from '#enums/DomNodeType';

export const NonDocumentTypeChildNode = <T extends Node = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		nextElementSibling: {
			get(this: T & NonDocumentTypeChildNode) {
				return null;
			},
			enumerable: true,
		},
		previousElementSibling: {
			get(this: T & NonDocumentTypeChildNode) {
				return null;
			},
			enumerable: true,
		},
	}) as T & NonDocumentTypeChildNode;

/**
 * Checks that an `unknown` value is an {@link Node} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Node} node.
 */
export const isNonDocumentTypeChildNode = <T extends NonDocumentTypeChildNode = NonDocumentTypeChildNode>(
	value: unknown,
	type?: DomNodeType,
): value is T =>
	/**
	 * value
	 */
	((!isUndefined(window) && value instanceof Node) ||
		(isObject(value) &&
			/**
			 * value.nodeType
			 */
			'nodeType' in value &&
			isDomNodeType(DomNodeType[value.nodeType as number]))) &&
			(type ? value.nodeType === type : true);

export default NonDocumentTypeChildNode;
