import { isObject, isUndefined } from '@com.robhameetman/utils';
import DomNodeType, { isDomNodeType } from '@/enums/DomNodeType';

export const Animatable = <T extends Node = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		animate: {
			value(this: T & Animatable) {},
			enumerable: true,
		},
		getAnimations: {
			value(this: T & Animatable) {
				return [];
			},
			enumerable: true,
		},
	}) as T & Animatable;

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
export const isAnimatable = <T extends ChildNode = ChildNode>(
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

export default Animatable;
