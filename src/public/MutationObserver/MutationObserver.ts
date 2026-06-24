import List from '#infra/List';
import Queue from '#infra/Queue';
import { disposeCallbackFor, initializeCallbackFor } from '#public/MutationObserver/associations/callback';
import { disposeNodeListFor, nodeListOf } from '#public/MutationObserver/associations/nodeList';
import { disposeRecordQueueFor, recordQueueOf } from '#public/MutationObserver/associations/recordQueue';
import { registeredObserversOf } from '#public/Node/associations/registeredObserverList';

export const MutationObserver = function(this: MutationObserver, callback: MutationCallback) {
	initializeCallbackFor(this, callback);
} as unknown as typeof global.MutationObserver;

// export const MutationObserver = implOf<typeof global.MutationObserver>(
// 	function MutationObserver(this: MutationObserver, callback: MutationCallback) {
// 		initializeCallbackFor(this, callback);

// 		return this;
// 	},
// 	{
// 		exposed: true,
// 		onInit: (instance) => {
// 			initializeNodeListFor(instance);
// 			initializeRecordQueueFor(instance);
// 		},
// 	},
// );

Object.defineProperties(MutationObserver, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			disconnect: {
				value(this: MutationObserver) {
					for (const node of nodeListOf(this) || List()) {
						registeredObserversOf(node.deref() as Node)?.remove(
							(observer) => observer.observer === this,
						);
					}

					recordQueueOf(this)?.empty();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			observe: {
				value(this: MutationObserver, target: Node, options = {} as MutationObserverInit) {
					if (('attributeOldValue' in options || 'attributeFilter' in options) && !('attributes' in options)) {
						options.attributes = true;
					}

					if ('characterDataOldValue' in options && !('characterData' in options)) {
						options.characterData = true;
					}

					if (!(options.childList || options.attributes || options.characterData)) {
						throw new TypeError('Failed to execute \'observe\' on \'MutationObserver\': At least one of the \'childList\', \'attributes\', or \'characterData\' options must be true.');
					}

					if (options.attributeOldValue && !options.attributes) {
						throw new TypeError('Failed to execute \'observe\' on \'MutationObserver\': The \'attributeOldValue\' option can only be true if the \'attributes\' option is also true.');
					}

					if (options.attributeFilter && !options.attributes) {
						throw new TypeError('Failed to execute \'observe\' on \'MutationObserver\': The \'attributeFilter\' option can only be specified if the \'attributes\' option is also true.');
					}

					if (options.characterDataOldValue && !options.characterData) {
						throw new TypeError('Failed to execute \'observe\' on \'MutationObserver\': The \'characterDataOldValue\' option can only be true if the \'characterData\' option is also true.');
					}

					const thisNodeList = nodeListOf(this) || List();
					const targetRegisteredObservers = registeredObserversOf(target) || List();

					for (const registered of targetRegisteredObservers) {
						if (registered.observer === this) {
							for (const node of thisNodeList) {
								registeredObserversOf(node.deref() as Node)?.remove(
									(observer) => 'source' in observer && observer.source === registered
								);
							}

							return;
						}
					}

					thisNodeList.append(new WeakRef(target));
					targetRegisteredObservers.append({ observer: this, options });
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			takeRecords: {
				get(this: MutationObserver) {
					const records = recordQueueOf(this)?.clone();

					recordQueueOf(this)?.empty();

					return records || Queue<MutationRecord>(); // should this be converted to an array?
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: MutationObserver,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: MutationObserver) {
					disposeCallbackFor(this);
					disposeNodeListFor(this);
					disposeRecordQueueFor(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'MutationObserver',
				configurable: true,
			},
		})),
	},
});

Object.seal(MutationObserver);

if (!globalThis.MutationObserver) {
	globalThis.MutationObserver = MutationObserver;
}

/**
 * Checks that an `unknown` value is an {@link MutationObserver}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `MutationObserver`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link MutationObserver}.
 */
export const isMutationObserver = (value: unknown): value is MutationObserver =>
	typeof globalThis.MutationObserver !== 'undefined' &&
	value instanceof globalThis.MutationObserver;

export default MutationObserver;
