/**
 * @see https://dom.spec.whatwg.org/#concept-element-shadow-root
 */
const shadowRoot = new WeakMap<Element, ShadowRoot | null>();

export const disposeShadowRootOf = (node: Element) => {
	shadowRoot.delete(node);
};

export const shadowRootOf = (node: Element) => {
	if (!shadowRoot.has(node)) {
		shadowRoot.set(node, null);
	}

	return shadowRoot.get(node) as ShadowRoot | null;
};

export const setShadowRootOf = (node: Element, root: ShadowRoot) => {
	shadowRoot.set(node, root);
};
