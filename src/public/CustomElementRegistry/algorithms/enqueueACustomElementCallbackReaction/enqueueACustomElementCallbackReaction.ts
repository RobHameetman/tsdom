import { type CustomElementDefinition, customElementDefinitionOf } from '#public/Element/associations/customElementDefinition';
import enqueueAnElementOnTheAppropriateElementQueue from '#public/CustomElementRegistry/algorithms/enqueueAnElementOnTheAppropriateElementQueue';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#enqueue-a-custom-element-callback-reaction
 */
export const enqueueACustomElementCallbackReaction = (element: Element, callbackName: string, args: ReadonlyArray<unknown>) => {
	const definition = customElementDefinitionOf(element) as CustomElementDefinition;
	let callback = definition.lifecycleCallbacks[callbackName as keyof typeof definition.lifecycleCallbacks];

	if (callbackName === 'connectedMoveCallback' && !callback) {
		const { connectedCallback, disconnectedCallback } = definition.lifecycleCallbacks;

		if (!connectedCallback && !disconnectedCallback) {
			return;
		}

		callback = () => {
			if (disconnectedCallback) {
				disconnectedCallback();
			}

			if (connectedCallback) {
				connectedCallback();
			}
		};
	}

	if (!callback) {
		return;
	}

	if (callbackName === 'attributeChangedCallback') {
		const attributeName = args[0] as string;

		if (!definition.observedAttributes.includes(attributeName)) {
			return;
		}
	}

	/**
	 * @TODO Add a new callback reaction to element's custom element reaction
	 * queue, with callback function callback and arguments args.
	 */

	enqueueAnElementOnTheAppropriateElementQueue(element);
};

export default enqueueACustomElementCallbackReaction;
