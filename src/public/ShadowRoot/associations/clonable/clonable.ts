/**
 * @see https://dom.spec.whatwg.org/#shadowroot-clonable
 */
export type Clonable = boolean;

const clonable = new WeakMap<ShadowRoot, Clonable>();

export const disposeClonableOf = (shadowRoot: ShadowRoot) => {
	clonable.delete(shadowRoot);
};

export const initializeClonableOf = (shadowRoot: ShadowRoot) => {
	if (!clonable.has(shadowRoot)) {
		clonable.set(shadowRoot, true);
	}
};

export const clonableOf = (shadowRoot: ShadowRoot) => {
	return clonable.get(shadowRoot) ?? true;
};

export const setClonableOf = (shadowRoot: ShadowRoot, value: Clonable) => {
	clonable.set(shadowRoot, value);
};
