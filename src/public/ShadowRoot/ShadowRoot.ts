import DocumentFragment from '#public/DocumentFragment';
import DocumentOrShadowRoot from '#mixins/DocumentOrShadowRoot';
import { rootOf } from '#tree/Tree/relationships/parents';
import { firstPathOf } from '#public/Event/associations/path';
import { setGetTheParentOf } from '#public/EventTarget/associations/getTheParent';
import { disposeAvailableToElementInternalsOf } from '#public/ShadowRoot/associations/availableToElementInternals';
import { clonableOf, disposeClonableOf } from '#public/ShadowRoot/associations/clonable';
import { disposeCustomElementRegistryOf } from '#public/ShadowRoot/associations/customElementRegistry';
import { disposeDeclarativeOf } from '#public/ShadowRoot/associations/declarative';
import { disposeDelegatesFocusOf, delegatesFocusOf } from '#public/ShadowRoot/associations/delegatesFocus';
import { disposeHostOf, hostOf } from '#public/ShadowRoot/associations/host';
import { disposeKeepCustomElementRegistryNullOf } from '#public/ShadowRoot/associations/keepCustomElementRegistryNull';
import { disposeModeOf, modeOf } from '#public/ShadowRoot/associations/mode';
import { disposeSerializableOf, serializableOf } from '#public/ShadowRoot/associations/serializable';
import { disposeSlotAssignmentOf, slotAssignmentOf } from '#public/ShadowRoot/associations/slotAssignment';

const withMixins = (prototype: ShadowRoot) =>
	DocumentOrShadowRoot(prototype);

export const ShadowRoot = function(this: ShadowRoot) {
	throw new TypeError('Failed to construct \'ShadowRoot\': Illegal constructor');
} as unknown as typeof global.ShadowRoot;

// export const ShadowRoot = implOf<typeof global.ShadowRoot>(
// 	function ShadowRoot(this: ShadowRoot) {
// 		DocumentFragment.call(this);
// 		DocumentOrShadowRoot.call(this);

// 		setGetTheParentOf(this, (event: Event) => {
// 			/**
// 			 * null if event’s composed flag is unset and shadow root is the root of
// 			 * event’s path’s first struct’s invocation target.
// 			 */
// 			if (!event.composed && this.isSameNode(rootOf(firstPathOf(event)?.invocationTarget as Node))) {
// 				return null;
// 			}

// 			return this.host as EventTarget;
// 		});

// 		host.set(this, _host);
// 		mode.set(this, _mode);
// 		delegatesFocus.set(this, false);
// 		availableToElementInternals.set(this, false);
// 		declarative.set(this, false);
// 		slotAssignment.set(this, _assignment);
// 		clonable.set(this, false);
// 		serializable.set(this, false);
// 		customElementRegistry.set(this, null);
// 		keepCustomElementRegistryNull.set(this, false);

// 		return this;
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(ShadowRoot, {
	prototype: {
		value: Object.seal(withMixins(Object.create(DocumentFragment.prototype, {
			clonable: {
				get(this: ShadowRoot) {
					return clonableOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			delegatesFocus: {
				get(this: ShadowRoot) {
					return delegatesFocusOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			host: {
				get(this: ShadowRoot) {
					return hostOf(this);
				},
			},
			innerHTML: {
				get(this: ShadowRoot) {
					/**
					 * @TODO
					 */
					return '';
				},
				set(this: ShadowRoot, _html: string) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
			},
			mode: {
				get(this: ShadowRoot) {
					return modeOf(this);
				},
			},
			onslotchange: {
				get(this: ShadowRoot) {
					return null;
				},
				set(this: ShadowRoot, _handler: ((this: ShadowRoot, ev: Event) => unknown) | null) {
					// Do nothing for now
				},
				configurable: true,
				enumerable: true,
			},
			serializable: {
				get(this: ShadowRoot) {
					return serializableOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			slotAssignment: {
				get(this: ShadowRoot) {
					return slotAssignmentOf(this);
				},
			},
			getHTML: {
				value(this: ShadowRoot, _options?: GetHTMLOptions) {
					return '';
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setHTMLUnsafe: {
				value(this: ShadowRoot, _html: string) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: ShadowRoot,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: ShadowRoot) {
					disposeSlotAssignmentOf(this);
					disposeSerializableOf(this);
					disposeModeOf(this);
					disposeDelegatesFocusOf(this);
					disposeClonableOf(this);
					disposeDeclarativeOf(this);
					disposeKeepCustomElementRegistryNullOf(this);
					disposeAvailableToElementInternalsOf(this);
					disposeCustomElementRegistryOf(this); // do we need this?
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: ShadowRoot) {
					disposeSlotAssignmentOf(this);
					disposeSerializableOf(this);
					disposeModeOf(this);
					disposeDelegatesFocusOf(this);
					disposeClonableOf(this);
					disposeDeclarativeOf(this);
					disposeKeepCustomElementRegistryNullOf(this);
					disposeAvailableToElementInternalsOf(this);
					disposeCustomElementRegistryOf(this); // do we need this?
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'ShadowRoot',
				configurable: true,
			},
		}))),
	},
});

Object.seal(ShadowRoot);

if (!globalThis.ShadowRoot) {
	globalThis.ShadowRoot = ShadowRoot;
}

/**
 * Checks that an `unknown` value is a {@link ShadowRoot}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link ShadowRoot} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link ShadowRoot}.
 */
export const isShadowRoot = (value: unknown): value is ShadowRoot =>
	typeof globalThis.ShadowRoot !== 'undefined' &&
	value instanceof globalThis.ShadowRoot;

export const assertIsShadowRoot = (_value: unknown): _value is ShadowRoot =>
	true;

export const asShadowRoot = (value: unknown): ShadowRoot =>
	value as ShadowRoot;

export default ShadowRoot;
