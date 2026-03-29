/**
 * @see https://dom.spec.whatwg.org/#shadowroot-declarative
 */
export type Declarative = boolean;

const declarative = new WeakMap<ShadowRoot, Declarative>();

export const declarativeOf = (shadowRoot: ShadowRoot) => {
	return declarative.get(shadowRoot) || false;
};

export const disposeDeclarativeOf = (shadowRoot: ShadowRoot) => {
	declarative.delete(shadowRoot);
};

export const initializeDeclarativeOf = (shadowRoot: ShadowRoot) => {
	if (!declarative.has(shadowRoot)) {
		declarative.set(shadowRoot, false);
	}
};

export const setDeclarativeOf = (shadowRoot: ShadowRoot, value: Declarative) => {
	declarative.set(shadowRoot, value);
};
