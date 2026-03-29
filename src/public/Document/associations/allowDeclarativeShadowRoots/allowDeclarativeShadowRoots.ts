/**
 * @see https://dom.spec.whatwg.org/#document-allow-declarative-shadow-roots
 */
export type AllowDeclarativeShadowRootsFlag = boolean;

const allowDeclarativeShadowRoots = new WeakMap<Document, AllowDeclarativeShadowRootsFlag>();

export const allowDeclarativeShadowRootsOf = (document: Document) => {
	return allowDeclarativeShadowRoots.get(document) || false;
};

export const disposeAllowDeclarativeShadowRootsOf = (document: Document) => {
	allowDeclarativeShadowRoots.delete(document);
};

export const setAllowDeclarativeShadowRootsOf = (document: Document, to: AllowDeclarativeShadowRootsFlag) => {
	allowDeclarativeShadowRoots.set(document, to);
};
