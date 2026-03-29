/**
 * @see https://dom.spec.whatwg.org/#document-custom-element-registry
 */
const customElementRegistry = new WeakMap<Document, CustomElementRegistry | null>();

export const disposeCustomElementRegistryOf = (document: Document) => {
	customElementRegistry.delete(document);
};

export const customElementRegistryOf = (document: Document): CustomElementRegistry | null => {
	return customElementRegistry.get(document) || null;
};

export const setCustomElementRegistryOf = (document: Document, to: CustomElementRegistry | null) => {
	customElementRegistry.set(document, to);
};
