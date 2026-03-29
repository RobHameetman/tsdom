/**
 * @see https://dom.spec.whatwg.org/#concept-cd-data
 */
const data = new WeakMap<CharacterData, string>();

export const disposeDataOf = (node: CharacterData) => {
	data.delete(node);
};

export const dataOf = (node: CharacterData) => {
	return data.get(node) || '';
};

export const initializeDataOf = (node: CharacterData) => {
	if (!data.has(node)) {
		data.set(node, '');
	}
};

export const insertDataOf = (node: CharacterData, value: string, offset: number) => {
	const after = offset + 1;
	const currentData = dataOf(node);

	data.set(node, `${currentData.substring(0, after)}${value}${currentData.substring(after)}`);
};

export const removeDataFrom = (node: CharacterData, offset: number, count: number) => {
	data.set(node, dataOf(node).substring(offset, count + 1));
};

export const setDataOf = (node: CharacterData, value: string) => {
	data.set(node, value);
};
