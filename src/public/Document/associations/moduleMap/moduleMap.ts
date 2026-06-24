import type { ModuleScript } from '#algorithms/reportAnException';

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#module-map
 */
export type ModuleMap = Map<[URL, string], ModuleScript | null | 'fetching'>;

const moduleMap = new WeakMap<Document, ModuleMap>();

export const moduleMapOf = (document: Document) => {
	return moduleMap.get(document);
};

export const disposeModuleMapOf = (document: Document) => {
	moduleMap.delete(document);
};

export const setModuleMapOf = (document: Document, to: ModuleMap) => {
	moduleMap.set(document, to);
};
