/**
 * @see https://dom.spec.whatwg.org/#shadowroot-available-to-element-internals
 */
export type AvailableToElementInternals = boolean;

const availableToElementInternals = new WeakMap<ShadowRoot, AvailableToElementInternals>();

export const disposeAvailableToElementInternalsOf = (shadowRoot: ShadowRoot) => {
	availableToElementInternals.delete(shadowRoot);
};

export const initializeAvailableToElementInternalsOf = (shadowRoot: ShadowRoot) => {
	if (!availableToElementInternals.has(shadowRoot)) {
		availableToElementInternals.set(shadowRoot, false);
	}
};

export const availableToElementInternalsOf = (shadowRoot: ShadowRoot) => {
	return availableToElementInternals.get(shadowRoot) || false;
};

export const setAvailableToElementInternalsOf = (
	shadowRoot: ShadowRoot,
	value: AvailableToElementInternals,
) => {
	availableToElementInternals.set(shadowRoot, value);
};
