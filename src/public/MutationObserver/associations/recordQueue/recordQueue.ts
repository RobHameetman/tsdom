import Queue from '#infra/Queue';

/**
 * @see https://dom.spec.whatwg.org/#concept-mo-queue
 */
const recordQueue = new WeakMap<MutationObserver, Queue<MutationRecord>>();

export const disposeRecordQueueFor = (observer: MutationObserver) => {
	recordQueue.delete(observer);
};

export const recordQueueOf = (observer: MutationObserver) => {
	if (!recordQueue.has(observer)) {
		recordQueue.set(observer, new Queue<MutationRecord>());
	}

	return recordQueue.get(observer) as Queue<MutationRecord>;
};

export const enqueueRecord = (observer: MutationObserver, record: MutationRecord) => {
	recordQueueOf(observer).enqueue(record);
};
