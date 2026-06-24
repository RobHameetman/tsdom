import type { ElementQueue } from '#agent/__CUSTOM_ELEMENT_REACTIONS_STACK__';
import { customElementReactionQueueOf } from '#public/Element/associations/customElementReactionQueue';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#invoke-custom-element-reactions
 */
export const invokeCustomElementReactions = (queue: ElementQueue) => {
	while (!queue.isEmpty()) {
		const element = queue.dequeue() as Element;
		const reactions = customElementReactionQueueOf(element);

		while (!reactions.isEmpty()) {
			const reaction = reactions.dequeue() as () => void;

			/**
			 * Switch on reaction's type:
			 * - Upgrade Reaction: Upgrade element using reaction's custom element definition. If this throws an exception, catch it, and report it for reaction's custom element definition's constructor's corresponding JavaScript object's associated realm's global object.
			 * - Callback Reaction: Invoke reaction's callback function with reaction's arguments and "report", and callback this value set to element.
			 */
		}
	}
};

export default invokeCustomElementReactions;
