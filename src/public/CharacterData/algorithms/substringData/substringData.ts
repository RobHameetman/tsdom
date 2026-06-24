import IndexSizeError from '#errors/IndexSizeError';
import lengthOf from '#tree/NodeTree/algorithms/length';

/**
 * @see https://dom.spec.whatwg.org/#concept-cd-replace
 */
export const substringData = (node: CharacterData, offset: number, count: number) => {
	let length = lengthOf(node);

	if (offset > length) {
		throw new IndexSizeError({}, 'substringData', 'The offset is greater than the length.');
	}

	if (offset + count > length) {
		return node.data.substring(offset);
	}

	return node.data.substring(offset, offset + count);
};

export default substringData;
