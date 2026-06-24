import Queue from '#infra/Queue';

type UpgradeReaction = unknown;
type CallbackReaction = unknown;

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reaction-queue
 */
const customElementReactionQueue = new WeakMap<Element, Queue<UpgradeReaction | CallbackReaction>>();

export const disposeCustomElementReactionQueueOf = (element: Element) => {
	customElementReactionQueue.delete(element);
};

export const customElementReactionQueueOf = (element: Element) => {
	if (!customElementReactionQueue.has(element)) {
		customElementReactionQueue.set(element, new Queue<UpgradeReaction | CallbackReaction>());
	}

	return customElementReactionQueue.get(element) as Queue<UpgradeReaction | CallbackReaction>;
};
