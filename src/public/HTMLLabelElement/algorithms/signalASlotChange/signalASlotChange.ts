import signalSlots from '@/agent/__SIGNAL_SLOTS__';
import queueAMutationObserverMicrotask from '@/public/MutationObserver/algorithms/queueAMutationObserverMicrotask';

/**
 * @see https://dom.spec.whatwg.org/#signal-a-slot-change
 *
 * @param slot - A slot element.
 */
export const signalASlotChange = (slot: HTMLSlotElement) => {
	signalSlots().append(slot);

	queueAMutationObserverMicrotask();
};

export default signalASlotChange;
