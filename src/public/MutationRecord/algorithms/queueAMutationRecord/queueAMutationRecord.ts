import pendingMutationObservers from '@/agent/__PENDING_MUTATION_OBSERVERS__';
import { inclusiveAncestorsOf } from '@/tree/Tree/relationships/parents';
import { registeredObserversOf } from '@/public/Node/associations';
import { enqueueRecord } from '@/public/MutationObserver/associations/recordQueue';
import { setType } from '@/public/MutationRecord/data/type';
import { setTarget } from '@/public/MutationRecord/data/target';
import { setAttributeName } from '@/public/MutationRecord/data/attributeName';
import { setAttributeNamespace } from '@/public/MutationRecord/data/attributeNamespace';
import { setOldValue } from '@/public/MutationRecord/data/oldValue';
import { setAddedNodes } from '@/public/MutationRecord/data/addedNodes';
import { setRemovedNodes } from '@/public/MutationRecord/data/removedNodes';
import { setNextSibling } from '@/public/MutationRecord/data/nextSibling';
import { setPreviousSibling } from '@/public/MutationRecord/data/previousSibling';
import queueAMutationObserverMicrotask from '@/public/MutationObserver/algorithms/queueAMutationObserverMicrotask';

/**
 * Queues a mutation record for all interested mutation observers.
 *
 * @see https://dom.spec.whatwg.org/#queue-a-mutation-record
 *
 * @param type - The type of mutation.
 * @param target - The target node of the mutation.
 * @param name - The attribute name of the mutation.
 * @param namespace - The attribute namespace of the mutation.
 * @param oldValue - The old value of the mutation.
 * @param addedNodes - The added nodes of the mutation.
 * @param removedNodes - The removed nodes of the mutation.
 * @param nextSibling - The next sibling of the mutation.
 * @param previousSibling - The previous sibling of the mutation.
 */
export const queueAMutationRecord = (
	type: MutationRecordType,
	target: Node,
	name: MutationRecord['attributeName'],
	namespace: MutationRecord['attributeNamespace'],
	oldValue: MutationRecord['oldValue'],
	addedNodes: MutationRecord['addedNodes'],
	removedNodes: MutationRecord['removedNodes'],
	nextSibling: MutationRecord['nextSibling'],
	previousSibling: MutationRecord['previousSibling'],
) => {
	const interestedObservers = new Map<MutationObserver, MutationRecord['oldValue']>();
	const nodes = inclusiveAncestorsOf(target);

	nodes.forEach((node) => {
		registeredObserversOf(node).forEach((registered) => {
			const { options } = registered;

			const bail =
				node !== target && !options.subtree ||
				type === 'attributes' && !options.attributes ||
				type === 'attributes' && options.attributeFilter && name && (!options.attributeFilter.includes(name) || namespace !== null) ||
				type === 'characterData' && !options.characterData ||
				type === 'childList' && !options.childList;

			if (!bail) {
				const { observer: mo } = registered;

				if (!interestedObservers.has(mo)) {
					interestedObservers.set(mo, null);
				}

				if ((type === 'attributes' && options.attributeOldValue) || (type === 'characterData' && options.characterDataOldValue)) {
					interestedObservers.set(mo, oldValue);
				}
			}
		});
	});

	interestedObservers.forEach((mappedOldValue, observer) => {
		const record = Object.create(MutationRecord.prototype) as MutationRecord;

		setType(record, type);
		setTarget(record, target);
		setAttributeName(record, name);
		setAttributeNamespace(record, namespace);
		setOldValue(record, mappedOldValue);
		setAddedNodes(record, addedNodes);
		setRemovedNodes(record, removedNodes);
		setNextSibling(record, nextSibling);
		setPreviousSibling(record, previousSibling);

		enqueueRecord(observer, record);
		pendingMutationObservers().append(observer);
	});

	queueAMutationObserverMicrotask();
};

export default queueAMutationRecord;
