import type OrderedSet from '@/infra/OrderedSet';
import type { Slot } from '@/tree/ShadowTree/relationships/slots';
import { setMutationObserverMicrotaskQueuedToFalse } from '@/agent/__MUTATION_OBSERVER_MICROTASK_QUEUED__';
import pendingMutationObservers from '@/agent/__PENDING_MUTATION_OBSERVERS__';
import signalSlots from '@/agent/__SIGNAL_SLOTS__';
import { recordQueueOf } from '@/public/MutationObserver/associations/recordQueue';
import fireAnEvent from '@/public/Event/algorithms/fireAnEvent';
import { invokeCallbackFor } from '@/public/MutationObserver/associations/callback';
import { nodeListOf } from '@/public/MutationObserver/associations/nodeList';
import { registeredObserversOf } from '@/public/Node/associations/registeredObserverList';

/**
 *
 * @param node
 * @returns
 */
export const notifyMutationObservers = () => {
	setMutationObserverMicrotaskQueuedToFalse();

	const notifySet = pendingMutationObservers().clone() as OrderedSet<MutationObserver>;

	pendingMutationObservers().empty();

	const signalSet = signalSlots().clone() as OrderedSet<Slot>;

	signalSlots().empty();

	for (const mo of notifySet) {
		const records = recordQueueOf(mo)?.clone();

		recordQueueOf(mo)?.empty();

		nodeListOf(mo)?.forEach((node) => {
			registeredObserversOf(node.deref() as Node)?.remove(
				(observer) => 'source' in observer && observer.observer === mo,
			);
		});

		if (records && !records.isEmpty()) {
			invokeCallbackFor(mo, records);
		}
	}

	for (const slot of signalSet) {
		fireAnEvent('slotchange', slot, undefined, { bubbles: true });
	}
};

export default notifyMutationObservers;
