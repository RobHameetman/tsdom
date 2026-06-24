import type { DOMString } from '#webidl/DOMString';
import type { Sequence } from '#webidl/Sequence';

export type ConnectectedCallback = () => void;
export type DisconnectedCallback = () => void;
export type AdoptedCallback = () => void;
export type ConnectedMoveCallback = () => void;
export type AttributeChangedCallback = (name: string, oldValue: string | null, newValue: string | null) => void;
export type FormAssociatedCallback = (form: HTMLFormElement | null) => void;
export type FormDisabledCallback = (disabled: boolean) => void;
export type FormResetCallback = () => void;
export type FormStateRestoreCallback = (state: string | File | FormData | null, reason: 'autocomplete' | 'restore') => void;

export interface CustomElementDefinitionLifecycleCallbacks {
	readonly connectedCallback: ConnectectedCallback;
	readonly disconnectedCallback: DisconnectedCallback;
	readonly adoptedCallback: AdoptedCallback;
	readonly connectedMoveCallback: ConnectedMoveCallback;
	readonly attributeChangedCallback: AttributeChangedCallback;
	readonly formAssociatedCallback: FormAssociatedCallback;
	readonly formDisabledCallback: FormDisabledCallback;
	readonly formResetCallback: FormResetCallback;
	readonly formStateRestoreCallback: FormStateRestoreCallback;
}

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-definition
 */
export interface CustomElementDefinition {
	readonly name: string;
	readonly localName: string;
	readonly constructor: Function;
	readonly observedAttributes: Sequence<DOMString>;
	readonly lifecycleCallbacks: CustomElementDefinitionLifecycleCallbacks;
	readonly constructionStack: Array<Element>;
	readonly formAssociated: boolean;
	readonly disableInternals: boolean;
	readonly disableShadow: boolean;
}

/**
 * @see https://dom.spec.whatwg.org/#concept-element-custom-element-definition
 */
const customElementDefinition = new WeakMap<Element, CustomElementDefinition>();

export const disposeCustomElementDefinitionOf = (node: Element) => {
	customElementDefinition.delete(node);
};

export const customElementDefinitionOf = (node: Element) => {
	return customElementDefinition.get(node) || 'undefined';
};

export const initializeCustomElementDefinitionOf = (node: Element) => {
	if (!customElementDefinition.has(node)) {
		customElementDefinition.set(node, {} as CustomElementDefinition);
	}
};

export const setCustomElementDefinitionOf = (node: Element, definition: CustomElementDefinition) => {
	customElementDefinition.set(node, definition);
};
