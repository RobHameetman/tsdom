import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import DomNodeType, { isDomNodeType } from '#enums/DomNodeType';

export const NonElementParentNode = <T extends Node = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		getElementById: {
			value(this: T & NonElementParentNode, _elementId: string) {
				return null as Element | null;
			},
		},
	}) as T & NonElementParentNode;

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
export const isNonElementParentNode = <T extends NonElementParentNode = NonElementParentNode>(
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

export default NonElementParentNode;
