import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import DomNodeType, { isDomNodeType } from '#enums/DomNodeType';

export const AnimationFrameProvider = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		cancelAnimationFrame: {
			value(this: AnimationFrameProvider, handle: number) {
				// @TODO - implement
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		requestAnimationFrame: {
			value(
				this: AnimationFrameProvider,
				callback: FrameRequestCallback,
			) {
				// @TODO - implement
				return 0;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
	}) as T & AnimationFrameProvider;

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
export const isAnimationFrameProvider = <T extends ChildNode = ChildNode>(
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

export default AnimationFrameProvider;
