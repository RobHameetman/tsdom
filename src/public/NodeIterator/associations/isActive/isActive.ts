/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-active
 */
const isActive = new WeakMap<NodeIterator, boolean>();

export const isActiveOf = (iterator: NodeIterator) => {
	return isActive.get(iterator) || false;
};

export const isActiveIsTrueFor = (iterator: NodeIterator) => {
	return isActive.get(iterator) === true;
};

export const isActiveIsFalseFor = (iterator: NodeIterator) => {
	return isActive.get(iterator) === false;
};

export const initializeIsActiveOf = (iterator: NodeIterator) => {
	if (!isActive.has(iterator)) {
		isActive.set(iterator, false);
	}
};

export const setIsActiveToTrueFor = (iterator: NodeIterator) => {
	isActive.set(iterator, true);
};

export const setIsActiveToFalseFor = (iterator: NodeIterator) => {
	isActive.set(iterator, false);
};
