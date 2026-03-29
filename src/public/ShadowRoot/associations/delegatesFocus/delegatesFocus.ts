/**
 * @see https://dom.spec.whatwg.org/#shadowroot-delegates-focus
 */
export type DelegatesFocus = boolean;

const delegatesFocus = new WeakMap<ShadowRoot, DelegatesFocus>();

export const delegatesFocusOf = (shadowRoot: ShadowRoot) => {
	return delegatesFocus.get(shadowRoot) || false;
};

export const disposeDelegatesFocusOf = (shadowRoot: ShadowRoot) => {
	delegatesFocus.delete(shadowRoot);
};

export const initializeDelegatesFocusOf = (shadowRoot: ShadowRoot) => {
	if (!delegatesFocus.has(shadowRoot)) {
		delegatesFocus.set(shadowRoot, false);
	}
};

export const setDelegatesFocusOf = (shadowRoot: ShadowRoot, value: DelegatesFocus) => {
	delegatesFocus.set(shadowRoot, value);
};
