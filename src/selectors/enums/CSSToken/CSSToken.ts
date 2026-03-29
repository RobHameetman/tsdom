import { isString } from '@/utils/functions/check/js/specialized/isString';

/**
 * @TODO
 */
export enum CSSToken {
  Ident = '<ident-token>',
  Function = '<function-token>',
  AtKeyword = '<at-keyword-token>',
  Hash = '<hash-token>',
  String = '<string-token>',
  BadString = '<bad-string-token>',
  URL = '<url-token>',
  BadURL = '<bad-url-token>',
  Delim = '<delim-token>',
  Number = '<number-token>',
  Percentage = '<percentage-token>',
  Dimension = '<dimension-token>',
  Whitespace = '<whitespace-token>',
  CDO = '<CDO-token>',
  CDC = '<CDC-token>',
  Colon = '<colon-token>',
  Semicolon = '<semicolon-token>',
  Comma = '<comma-token>',
  LeftParen = '<(-token>',
  RightParen = '<)-token>',
  LeftSquare = '<[-token>',
  RightSquare = '<]-token>',
  LeftCurly = '<{-token>',
  RightCurly = '<}-token>',
  EOF = '<EOF-token>'
}

/**
 * @TODO
 */
export const CSSTOKEN_VALUES = Object.freeze(
	Object.keys(CSSToken).filter(isString),
);

/**
 * Checks that an `unknown` value is an {@link CSSToken}.
 *
 * Requirements:
 *   - `value` must be a non-empty string and must be included as a string key
 *     of {@link CSSTOKEN_VALUES}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link CSSToken}.
 */
export const isCSSToken = (value: unknown): value is CSSToken =>
	/**
	 * value
	 */
	isString(value) && CSSTOKEN_VALUES.includes(value);

export default CSSToken;
