import mutationObserverMicrotaskQueued, { setMutationObserverMicrotaskQueuedToTrue } from '#agent/__MUTATION_OBSERVER_MICROTASK_QUEUED__';
import notifyMutationObservers from '#public/MutationObserver/algorithms/notifyMutationObservers';

/**
 *
 * @param node
 * @returns
 */
export const queueAMutationObserverMicrotask = () => {
	if (mutationObserverMicrotaskQueued()) {
		return;
	}

	setMutationObserverMicrotaskQueuedToTrue();

	queueMicrotask(notifyMutationObservers);
};

export default queueAMutationObserverMicrotask;
