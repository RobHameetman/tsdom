import Queue from '#infra/Queue';
import Stack from '#infra/Stack';

export type ElementQueue = Queue<Element>;
export type CustomElementReactionsStack = Stack<ElementQueue>;

const __CUSTOM_ELEMENT_REACTIONS_STACK__ = new WeakMap<typeof globalThis, CustomElementReactionsStack>();
const __BACKUP_ELEMENT_QUEUE__ = new WeakMap<CustomElementReactionsStack, ElementQueue>();
const __PROCESSING_THE_BACKUP_ELEMENT_QUEUE__ = new WeakMap<CustomElementReactionsStack, boolean>();

if (!__CUSTOM_ELEMENT_REACTIONS_STACK__.has(globalThis)) {
	const stack = new Stack<ElementQueue>();

	__CUSTOM_ELEMENT_REACTIONS_STACK__.set(globalThis, stack);
	__BACKUP_ELEMENT_QUEUE__.set(stack, new Queue<Element>());
	__PROCESSING_THE_BACKUP_ELEMENT_QUEUE__.set(stack, false);
}

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions-stack
 */
export const customElementReactionsStack = () => {
	return __CUSTOM_ELEMENT_REACTIONS_STACK__.get(globalThis) as CustomElementReactionsStack;
};

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#current-element-queue
 */
export const currentElementQueue = () => {
	return __CUSTOM_ELEMENT_REACTIONS_STACK__.get(globalThis)?.at(-1) as ElementQueue;
};

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#backup-element-queue
 */
export const backupElementQueue = () => {
	return __BACKUP_ELEMENT_QUEUE__.get(customElementReactionsStack() as CustomElementReactionsStack) as ElementQueue;
};

/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#processing-the-backup-element-queue
 */
export const processingTheBackupElementQueue = () => {
	return __PROCESSING_THE_BACKUP_ELEMENT_QUEUE__.get(customElementReactionsStack() as CustomElementReactionsStack) as boolean;
};

export const setProcessingTheBackupElementQueueFlag = () => {
	return __PROCESSING_THE_BACKUP_ELEMENT_QUEUE__.set(customElementReactionsStack() as CustomElementReactionsStack, true);
};

export const unsetProcessingTheBackupElementQueueFlag = () => {
	return __PROCESSING_THE_BACKUP_ELEMENT_QUEUE__.set(customElementReactionsStack() as CustomElementReactionsStack, false);
};
