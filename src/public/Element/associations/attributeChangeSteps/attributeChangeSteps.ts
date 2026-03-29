import List from '@/infra/List';
import NamedNodeMap from '@/public/NamedNodeMap';

export type AttributeChangeSteps = (
	element: Element,
	localName: string,
	oldValue: string | null,
	value: string | null,
	namespace: string | null,
) => void;

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attributes-change-ext
 */
const attributeChangeSteps = new WeakMap<Element, AttributeChangeSteps>();

export const disposeAttributeChangeStepsOf = (element: Element) => {
	attributeChangeSteps.delete(element);
};

export const attributeChangeStepsOf = (element: Element) => {
	return attributeChangeSteps.get(element) as AttributeChangeSteps;
};

// export const initializeAttributeChangeStepsOf = (node: Element) => {
// 	if (!attributeChangeSteps.has(node)) {
// 		attributeChangeSteps.set(node, new List<Attr>());
// 	}
// };

export const runAttributeChangeStepsOf = (element: Element, args: Parameters<AttributeChangeSteps>) => {
	attributeChangeStepsOf(element)(...args);
};

export const setAttributeChangeStepsOf = (element: Element, algorithm: AttributeChangeSteps) => {
	if (!attributeChangeSteps.has(element)) {
		attributeChangeSteps.set(element, algorithm);
	}
};
