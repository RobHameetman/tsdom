import OrderedSet from '@/infra/OrderedSet';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#scoped-document-set
 */
const scopedDocumentSet = new WeakMap<CustomElementRegistry, OrderedSet<Document>>();

export const disposeScopedDocumentSetOf = (registry: CustomElementRegistry) => {
	scopedDocumentSet.delete(registry);
};

export const scopedDocumentSetOf = (registry: CustomElementRegistry) => {
	if (!scopedDocumentSet.has(registry)) {
		scopedDocumentSet.set(registry, new OrderedSet<Document>());
	}

	return scopedDocumentSet.get(registry) as OrderedSet<Document>;
};
