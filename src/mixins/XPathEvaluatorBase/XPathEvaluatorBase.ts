import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import { isHTMLSlotElement } from '#public/HTMLSlotElement';

export const XPathEvaluatorBase = <T extends Document = Document>(prototype: T) =>
	Object.defineProperties(prototype, {
		createExpression: {
			value(this: T & XPathEvaluatorBase, expression: string, resolver?: XPathNSResolver | null) {
				return {} as XPathExpression;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		createNSResolver: {
			value(this: T & XPathEvaluatorBase, nodeResolver: Node) {
				return {} as Node;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		evaluate: {
			value(this: T & XPathEvaluatorBase, expression: string, contextNode: Node, resolver?: XPathNSResolver | null, type?: number, result?: XPathResult | null) {
				return {} as XPathResult;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
	}) as T & XPathEvaluatorBase;

/**
 * Checks that an `unknown` value is an {@link XPathEvaluatorBase} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link XPathEvaluatorBase} node.
 */
export const isXPathEvaluatorBase = (value: unknown): value is XPathEvaluatorBase =>
	/**
	 * value
	 */
	(!isUndefined(window) && value instanceof Node) ||
		(isObject(value) &&
			/**
			 * value.fonts
			 */
			'fonts' in value &&
			(isHTMLSlotElement(value.fonts) || value.fonts === null));

export default XPathEvaluatorBase;
