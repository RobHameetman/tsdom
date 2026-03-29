import { addedNodesOf, disposeAddedNodesOf } from '@/public/MutationRecord/data/addedNodes';
import { attributeNameOf, disposeAttributeNameOf } from '@/public/MutationRecord/data/attributeName';
import { attributeNamespaceOf, disposeAttributeNamespaceOf } from '@/public/MutationRecord/data/attributeNamespace';
import { disposeNextSiblingOf, nextSiblingOf } from '@/public/MutationRecord/data/nextSibling';
import { disposeOldValueOf, oldValueOf } from '@/public/MutationRecord/data/oldValue';
import { disposePreviousSiblingOf, previousSiblingOf } from '@/public/MutationRecord/data/previousSibling';
import { disposeRemovedNodesOf, removedNodesOf } from '@/public/MutationRecord/data/removedNodes';
import { disposeTargetOf, targetOf } from '@/public/MutationRecord/data/target';
import { disposeTypeOf, typeOf } from '@/public/MutationRecord/data/type';

export const MutationRecord = function(this: MutationRecord) {
	throw new TypeError('Failed to construct \'MutationRecord\': Illegal constructor');
} as unknown as typeof global.MutationRecord;

Object.defineProperties(MutationRecord, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			addedNodes: {
				get(this: MutationRecord) {
					return addedNodesOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			attributeName: {
				get(this: MutationRecord) {
					return attributeNameOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			attributeNamespace: {
				get(this: MutationRecord) {
					return attributeNamespaceOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			nextSibling: {
				get(this: MutationRecord) {
					return nextSiblingOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			oldValue: {
				get(this: MutationRecord) {
					return oldValueOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			previousSibling: {
				get(this: MutationRecord) {
					return previousSiblingOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			removedNodes: {
				get(this: MutationRecord) {
					return removedNodesOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			target: {
				get(this: MutationRecord) {
					return targetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			type: {
				get(this: MutationRecord) {
					return typeOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			constructor: {
				value: MutationRecord,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: MutationRecord) {
					disposeAddedNodesOf(this);
					disposeAttributeNameOf(this);
					disposeAttributeNamespaceOf(this);
					disposeNextSiblingOf(this);
					disposeOldValueOf(this);
					disposePreviousSiblingOf(this);
					disposeRemovedNodesOf(this);
					disposeTargetOf(this);
					disposeTypeOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: MutationRecord) {
					disposeAddedNodesOf(this);
					disposeAttributeNameOf(this);
					disposeAttributeNamespaceOf(this);
					disposeNextSiblingOf(this);
					disposeOldValueOf(this);
					disposePreviousSiblingOf(this);
					disposeRemovedNodesOf(this);
					disposeTargetOf(this);
					disposeTypeOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'MutationRecord',
				configurable: true,
			},
		})),
	},
});

Object.seal(MutationRecord);

if (!globalThis.MutationRecord) {
	globalThis.MutationRecord = MutationRecord;
}

/**
 * Checks that an `unknown` value is an {@link MutationRecord}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `MutationRecord`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link MutationRecord}.
 */
export const isMutationRecord = (value: unknown): value is MutationRecord =>
	typeof globalThis.MutationRecord !== 'undefined' &&
	value instanceof globalThis.MutationRecord;

export default MutationRecord;
