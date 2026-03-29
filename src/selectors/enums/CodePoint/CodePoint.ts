import { isString } from '@/utils/functions/check/js/specialized/isString';

/**
 * @TODO
 */
export enum CodePoint {
  Null = 0x0000,
  Backspace = 0x0008,
  Tab = 0x0009,
  LineFeed = 0x000a,
  LineTabulation = 0x000b,
  FormFeed = 0x000c,
  CarriageReturn = 0x000d,
  ShiftOut = 0x000e,
  InformationSeparatorOne = 0x001f,
  Space = 0x0020,
  ExclamationMark = 0x0021, // !
  QuotationMark = 0x0022, // "
  NumberSign = 0x0023, // #
  DollarSign = 0x0024, // $
  Percent = 0x0025, // %
  Ampersand = 0x0026, // &
  Apostrophe = 0x0027, // '
  LeftParen = 0x0028, // (
  RightParen = 0x0029, // )
  Asterisk = 0x002a, // *
  Plus = 0x002b, // +
  Comma = 0x002c, // ,
  HyphenMinus = 0x002d, // -
  FullStop = 0x002e, // .
  Solidus = 0x002f, // /
  DigitZero = 0x0030,
  DigitOne = 0x0031,
  DigitTwo = 0x0032,
  DigitThree = 0x0033,
  DigitFour = 0x0034,
  DigitFive = 0x0035,
  DigitSix = 0x0036,
  DigitSeven = 0x0037,
  DigitEight = 0x0038,
  DigitNine = 0x0039,
  Colon = 0x003a, // :
  Semicolon = 0x003b, // ;
  LessThan = 0x003c, // <
  Equals = 0x003d, // =
  GreaterThan = 0x003e, // >
  QuestionMark = 0x003f, // ?
  CommercialAt = 0x0040, // @
  LatinCapitalA = 0x0041,
  LatinCapitalE = 0x0045,
  LatinCapitalF = 0x0046,
  LatinCapitalZ = 0x005a,
  LeftSquare = 0x005b, // [
  ReverseSolidus = 0x005c, // \
  RightSquare = 0x005d, // ]
  Circumflex = 0x005e, // ^
  LowLine = 0x005f, // _
  GraveAccent = 0x0060, // `
  LatinSmallA = 0x0061,
  LatinSmallE = 0x0065,
  LatinSmallF = 0x0066,
  LatinSmallZ = 0x007a,
  LeftCurly = 0x007b, // {
  VerticalLine = 0x007c, // |
  RightCurly = 0x007d, // }
  Tilde = 0x007e, // ~
  Delete = 0x007f,
  Control = 0x0080,
  ReplacementCharacter = 0xfffd,
  MaxCodePoint = 0x10ffff,

	Digit = DigitZero | DigitOne | DigitTwo | DigitThree | DigitFour | DigitFive | DigitSix | DigitSeven | DigitEight | DigitNine,
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

export default CodePoint;
