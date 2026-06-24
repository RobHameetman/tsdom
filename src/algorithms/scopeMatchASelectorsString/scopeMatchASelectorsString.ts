import InvalidCharacterError from '#errors/InvalidCharacterError';
import NamespaceError from '#errors/NamespaceError';
import Namespace from '#enums/Namespace';
import validNamespacePrefix from '#algorithms/validNamespacePrefix';
import validAttributeLocalName from '#public/Attr/algorithms/validAttributeLocalName';
import validElementLocalName from '#public/Element/algorithms/validElementLocalName';

export type ValidateAndExtractContext = 'element' | 'attribute';

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
export const validateAndExtract = (namespace: string | null, qualifiedName: string, context: ValidateAndExtractContext) => {
	if (!namespace?.length) {
		namespace = null;
	}

	let prefix = null as string | null;
	let localName = qualifiedName;

	if (qualifiedName.includes(':')) {
		[prefix, localName] = qualifiedName.split(':', 2);

		if (!validNamespacePrefix(prefix)) {
			throw new InvalidCharacterError(
				{},
				'validateAndExtract',
				`The namespace prefix "${prefix}" is not valid.`,
			);
		}
	}

	if (context === 'attribute' && !validAttributeLocalName(localName)) {
		throw new InvalidCharacterError(
			{},
			'validateAndExtract',
			`The attribute local name "${localName}" is not valid.`,
		);
	}

	if (context === 'element' && !validElementLocalName(localName)) {
		throw new InvalidCharacterError(
			{},
			'validateAndExtract',
			`The element local name "${localName}" is not valid.`,
		);
	}

	if (prefix !== null && namespace === null) {
		throw new NamespaceError(
			{},
			'validateAndExtract',
			`A namespace prefix "${prefix}" was provided without a namespace.`,
		);
	}

	if (prefix === 'xml' && namespace !== Namespace.XML) {
		throw new NamespaceError(
			{},
			'validateAndExtract',
			`The "xml" prefix must be bound to the "http://www.w3.org/XML/1998/namespace" namespace.`,
		);
	}

	if ((qualifiedName === 'xmlns' || prefix === 'xmlns') && namespace !== Namespace.XMLNS) {
		throw new NamespaceError(
			{},
			'validateAndExtract',
			`The "xmlns" prefix must be bound to the "http://www.w3.org/2000/xmlns/" namespace.`,
		);
	}

	if (namespace === Namespace.XMLNS && qualifiedName !== 'xmlns' && prefix !== 'xmlns') {
		throw new NamespaceError(
			{},
			'validateAndExtract',
			`The "xmlns" prefix must be bound to the "http://www.w3.org/2000/xmlns/" namespace.`,
		);
	}

	return [namespace, prefix, localName] as const;
};

export default validateAndExtract;
