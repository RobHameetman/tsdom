/**
 * @see https://dom.spec.whatwg.org/#nodeiterator-pointer-before-reference
 */
const pointerBeforeReference = new WeakMap<NodeIterator, boolean>();

export const disposePointerBeforeReferenceOf = (iterator: NodeIterator) => {
	pointerBeforeReference.delete(iterator);
};

export const initializePointerBeforeReferenceOf = (iterator: NodeIterator, value: boolean) => {
	if (!pointerBeforeReference.has(iterator)) {
		pointerBeforeReference.set(iterator, value);
	}
};

export const pointerBeforeReferenceOf = (iterator: NodeIterator) => {
	return pointerBeforeReference.get(iterator) || false;
};

export const setPointerBeforeReferenceFor = (iterator: NodeIterator, value: boolean) => {
	pointerBeforeReference.set(iterator, value);
};

export const setPointerBeforeReferenceToFalseFor = (iterator: NodeIterator) => {
	pointerBeforeReference.set(iterator, false);
};

export const setPointerBeforeReferenceToTrueFor = (iterator: NodeIterator) => {
	pointerBeforeReference.set(iterator, true);
};
