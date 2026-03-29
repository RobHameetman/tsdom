// import implOf from '@/_internals/impl';
import DomNodeType from '@/enums/DomNodeType';
import Slottable, { isSlottable } from '@/mixins/Slottable';
import { setGetTheParentOf } from '@/public/EventTarget/associations/getTheParent';
import CharacterData from '@/public/CharacterData';
import { disposeDataOf, setDataOf } from '@/public/CharacterData/associations/data';
import { initializeNodeDocumentOf } from '@/public/Node/associations/nodeDocument';

const withMixins = (prototype: Text) =>
	Slottable(prototype);

/**
 * Represents a text Node in a DOM tree.
 */
export const Text = function(this: Text, data = '') {
	initializeNodeDocumentOf(this, document);

	setGetTheParentOf(this, (_event: Event) => {
		if (isSlottable(this) && this.assignedSlot !== null) {
			return this.assignedSlot as EventTarget;
		}

		return this.parentNode as EventTarget;
	});

	setDataOf(this, data);
} as unknown as typeof global.Text;

Object.defineProperties(Text, {
	prototype: {
		value: Object.seal(withMixins(Object.create(CharacterData.prototype, {
			wholeText: {
				get(this: Text) {
					let value = this.data;
					let next = this.nextSibling;

					while (next && next.nodeType === DomNodeType.TEXT_NODE) {
						value += (next as Text).data;
						next = next.nextSibling;
					}

					return value;
				},
				enumerable: true,
			},
			splitText: {
				value(this: Text, offset: number) {
					const newData = this.data.substring(offset);
					this.data = this.data.substring(0, offset);

					const $newNode = this.ownerDocument.createTextNode(newData);

					Text.call($newNode, newData);

					// _setNext(this, $newNode);

					// _setPrevious($newNode, this);
					// _setParent($newNode, this.parentNode);

					return $newNode;
				},
				enumerable: true,
			},
			[Symbol.dispose]: {
				value(this: Text) {
					if (Symbol.dispose in CharacterData.prototype) {
						(CharacterData.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: Text) {
					if (Symbol.asyncDispose in CharacterData.prototype) {
						await (CharacterData.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Text',
				configurable: true,
			},
		}))),
	},
});

Object.seal(Text);

if (!globalThis.Text) {
	globalThis.Text = Text;
}

/**
 * Checks that an `unknown` value is {@link Text}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Text} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link Text}.
 */
export const isText = (value: unknown): value is Text =>
	typeof globalThis.Text !== 'undefined' &&
	value instanceof globalThis.Text;

export default Text;
