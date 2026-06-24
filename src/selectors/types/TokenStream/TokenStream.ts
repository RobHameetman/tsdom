import List from '#infra/List';
import Stack from '#infra/Stack';

/**
 * @see https://drafts.csswg.org/css-syntax-3/#css-token-stream
 */
interface TokenStream {
	/**
	 * An index into the tokens, representing the progress of parsing. It starts
	 * at `0` initially.
	 */
	index: number;

	/**
	 * A list of tokens and/or component values.
	 */
	readonly tokens: List<Token | ComponentValue>;

	/**
	 * Points that the parser might return to. It starts empty initially.
	 */
	readonly markedIndexes: Stack<number>;
}
