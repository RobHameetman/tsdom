import { type CustomElementDefinition } from '#public/Element/associations/customElementDefinition';
import enqueueAnElementOnTheAppropriateElementQueue from '#public/CustomElementRegistry/algorithms/enqueueAnElementOnTheAppropriateElementQueue';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#enqueue-a-custom-element-upgrade-reaction
 */
export const enqueueACustomElementUpgradeReaction = (element: Element, definition: CustomElementDefinition) => {
	/**
	 * @TODO Add a new upgrade reaction to element's custom element reaction queue,
	 * with custom element definition _definition_.
	 */

	enqueueAnElementOnTheAppropriateElementQueue(element);
};

export default enqueueACustomElementUpgradeReaction;
