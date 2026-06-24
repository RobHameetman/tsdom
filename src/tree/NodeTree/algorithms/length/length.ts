import { isAttr } from '#public/Attr';
import { isCharacterData } from '#public/CharacterData';
import { isDocumentType } from '#public/DocumentType';

/**
 * Determines the length of a node. If a node is a {@link DocumentType} or an
 * {@link Attr}, its length is `0`. If a node is a {@link CharacterData} node,
 * its length is the length of its data. Otherwise, the length is the number of
 * child nodes.
 *
 * @see https://dom.spec.whatwg.org/#concept-node-empty
 *
 * @param node - A node to check.
 *
 * @returns A boolean which is `true` if the node is empty, `false` otherwise.
 */
export const length = (node: Node) => {
	if (isDocumentType(node) || isAttr(node)) {
		return 0;
	}

	if (isCharacterData(node)) {
		return (node as CharacterData).data.length;
	}

	return node.childNodes.length;
};

export default length;
