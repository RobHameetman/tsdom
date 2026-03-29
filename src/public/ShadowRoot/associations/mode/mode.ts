/**
 * @see https://dom.spec.whatwg.org/#shadowroot-mode
 */
const mode = new WeakMap<ShadowRoot, ShadowRootMode>();

export const disposeModeOf = (shadowRoot: ShadowRoot) => {
	mode.delete(shadowRoot);
};

export const modeOf = (shadowRoot: ShadowRoot) => {
	return mode.get(shadowRoot) || 'open';
};

export const initializeModeOf = (shadowRoot: ShadowRoot, shadowRootMode: ShadowRootMode) => {
	if (!mode.has(shadowRoot)) {
		mode.set(shadowRoot, shadowRootMode);
	}
};

export const setModeOf = (shadowRoot: ShadowRoot, shadowRootMode: ShadowRootMode) => {
	mode.set(shadowRoot, shadowRootMode);
};
