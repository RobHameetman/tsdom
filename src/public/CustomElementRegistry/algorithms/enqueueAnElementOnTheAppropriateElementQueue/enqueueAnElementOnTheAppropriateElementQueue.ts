import { backupElementQueue, currentElementQueue, customElementReactionsStack, processingTheBackupElementQueue, setProcessingTheBackupElementQueueFlag, unsetProcessingTheBackupElementQueueFlag } from '#agent/__CUSTOM_ELEMENT_REACTIONS_STACK__';

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#enqueue-an-element-on-the-appropriate-element-queue
 */
export const enqueueAnElementOnTheAppropriateElementQueue = (element: Element) => {
	const reactionsStack = customElementReactionsStack();

	if (reactionsStack.isEmpty()) {
		backupElementQueue().enqueue(element);

		if (processingTheBackupElementQueue()) {
			return
		}

		setProcessingTheBackupElementQueueFlag();

		queueMicrotask(() => {
			/**
			 * @TODO Invoke custom element reactions in reactionsStack's backup
			 * element queue.
			 */

			unsetProcessingTheBackupElementQueueFlag();
		});
	} else {
		currentElementQueue().enqueue(element);
	}
};

export default enqueueAnElementOnTheAppropriateElementQueue;
