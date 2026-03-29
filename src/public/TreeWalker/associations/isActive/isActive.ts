/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-active
 */
const isActive = new WeakMap<TreeWalker, boolean>();

export const isActiveOf = (iterator: TreeWalker) => {
	return isActive.get(iterator) || false;
};

export const isActiveIsTrueFor = (iterator: TreeWalker) => {
	return isActive.get(iterator) === true;
};

export const isActiveIsFalseFor = (iterator: TreeWalker) => {
	return isActive.get(iterator) === false;
};

export const initializeIsActiveOf = (iterator: TreeWalker) => {
	if (!isActive.has(iterator)) {
		isActive.set(iterator, false);
	}
};

export const setIsActiveToTrueFor = (iterator: TreeWalker) => {
	isActive.set(iterator, true);
};

export const setIsActiveToFalseFor = (iterator: TreeWalker) => {
	isActive.set(iterator, false);
};
