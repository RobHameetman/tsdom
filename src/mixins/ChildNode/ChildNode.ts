import { isObject, isUndefined } from '@com.robhameetman/utils';
import DomNodeType, { isDomNodeType } from '@/enums/DomNodeType';
import Node from '@/public/Node';

export const ChildNode = <T extends Node = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		after: {
			value(this: T & ChildNode, ..._nodes: ReadonlyArray<Node | string>) {
				/**
				 * @TODO
				 */
			},
			enumerable: true,
		},
		before: {
			value(this: T & ChildNode, ..._nodes: ReadonlyArray<Node | string>) {
				/**
				 * @TODO
				 */
			},
			enumerable: true,
		},
		remove: {
			value(this: T & ChildNode) {
				this.parentNode?.removeChild(this);
			},
			enumerable: true,
		},
		replaceWith: {
			value(this: T & ChildNode, ..._nodes: ReadonlyArray<Node | string>) {
				/**
				 * @TODO
				 */
			},
			enumerable: true,
		},
	}) as T & ChildNode;

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
export const isChildNode = <T extends ChildNode = ChildNode>(
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

export default ChildNode;
