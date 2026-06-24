import InvalidCharacterError from '#errors/InvalidCharacterError';
import NamespaceError from '#errors/NamespaceError';
import Namespace from '#enums/Namespace';
import validNamespacePrefix from '#algorithms/validNamespacePrefix';
import validAttributeLocalName from '#public/Attr/algorithms/validAttributeLocalName';
import validElementLocalName from '#public/Element/algorithms/validElementLocalName';

export type ValidateAndExtractContext = 'element' | 'attribute';

export const normalizeIntoATokenStream = (input: string) => {
  if (isTokenStream(input)) {
		return input;
	}

	if (isList(input)) {
		return {
			index: 0,
			tokens: input,
			markedIndexes: [],
		};
	}

	if (typeof input === 'string') {
		return {
			index: 0,
			tokens: tokenize(filterCodePoints(input)),
			markedIndexes: [],
		};
	}
};

/**
 * Determines whether a string is a valid attribute local name.
 *
 * A string is a valid namespace prefix if its length is at least 1 and it
 * does not contain ASCII whitespace, U+0000 NULL, U+002F (/), or U+003E (>).
 *
 * @see https://dom.spec.whatwg.org/#validate-and-extract
 *
 * @param namespace - The namespace prefix to validate.
 *
 * @returns A boolean which is `true` if the namespace prefix is valid, `false`
 * otherwise.
 */
export const parseSomethingAccordingToACssGrammar = (input: string, grammar: unknown) => {
};

export default parseSomethingAccordingToACssGrammar;
