/**
 * @see https://dom.spec.whatwg.org/#shadowroot-serializable
 */
export type Serializable = boolean;

const serializable = new WeakMap<ShadowRoot, Serializable>();

export const disposeSerializableOf = (shadowRoot: ShadowRoot) => {
	serializable.delete(shadowRoot);
};

export const initializeSerializableOf = (shadowRoot: ShadowRoot) => {
	if (!serializable.has(shadowRoot)) {
		serializable.set(shadowRoot, false);
	}
};

export const serializableOf = (shadowRoot: ShadowRoot) => {
	return serializable.get(shadowRoot) || false;
};

export const setSerializableOf = (shadowRoot: ShadowRoot, value: Serializable) => {
	serializable.set(shadowRoot, value);
};
