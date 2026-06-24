import List from '#infra/List';
import NamedNodeMap from '#public/NamedNodeMap';

/**
 * @see https://dom.spec.whatwg.org/#concept-element-attribute
 */
const attributeList = new WeakMap<Element, List<Attr>>();
const exposedAs = new WeakMap<Element, NamedNodeMap>();

export const disposeAttributeListOf = (node: Element) => {
	attributeList.delete(node);
};

export const attributeListOf = (node: Element) => {
	if (!attributeList.has(node)) {
		attributeList.set(node, new List<Attr>());
	}

	return attributeList.get(node) as List<Attr>;
};

export const initializeAttributeListOf = (node: Element) => {
	if (!attributeList.has(node)) {
		attributeList.set(node, new List<Attr>());
	}
};
