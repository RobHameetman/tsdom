import implOf from '@/_internals/impl';
import lengthOf from '@/tree/NodeTree/algorithms/length';
import Node from '@/public/Node';
import replaceData from '@/public/CharacterData/algorithms/replaceData';
import substringData from '@/public/CharacterData/algorithms/substringData';
import { dataOf, disposeDataOf, initializeDataOf } from '@/public/CharacterData/associations/data';

export const CharacterData = function(this: CharacterData) {
	throw new TypeError('Failed to construct \'CharacterData\': Illegal constructor');
} as unknown as typeof global.CharacterData;

// export const CharacterData = implOf<typeof global.CharacterData>(
// 	function CharacterData(this: CharacterData) {
// 		Node.call(this);

// 		return this;
// 	}, {
// 		onInit: (instance) => {
// 			initializeDataOf(instance);
// 		},
// 		subtypes: [
// 			Text,
// 			Comment,
// 			CDATASection,
// 		],
// 	},
// );

Object.defineProperties(CharacterData, {
	prototype: Object.seal(Object.create(Node.prototype, {
		data: {
			get(this: CharacterData) {
				return dataOf(this);
			},
			set(this: CharacterData, value: string) {
				replaceData(this, 0, this.length, value);
			},
			configurable: true,
			enumerable: true,
		},
		length: {
			get(this: CharacterData) {
				return lengthOf(this);
			},
			configurable: true,
			enumerable: true,
		},
		appendData: {
			value(this: CharacterData, data: string) {
				return replaceData(this, this.length, 0, data);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		deleteData: {
			value(this: CharacterData, offset: number, count: number) {
				return replaceData(this, offset, count, '');
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		insertData: {
			value(this: CharacterData, offset: number, data: string) {
				return replaceData(this, offset, 0, data);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		replaceData: {
			value(this: CharacterData, offset: number, count: number, data: string) {
				return replaceData(this, offset, count, data);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		substringData: {
			value(this: CharacterData, offset: number, count: number) {
				return substringData(this, offset, count);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		constructor: {
			value: CharacterData,
			configurable: true,
			writable: true,
		},
		[Symbol.dispose]: {
			value(this: CharacterData) {
				disposeDataOf(this);

				if (Symbol.dispose in Node.prototype) {
					(Node.prototype[Symbol.dispose] as Disposal).call(this);
				}
			},
			configurable: true,
			writable: true,
		},
		[Symbol.asyncDispose]: {
			async value(this: CharacterData) {
				disposeDataOf(this);

				if (Symbol.asyncDispose in Node.prototype) {
					await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
				}
			},
			configurable: true,
			writable: true,
		},
		[Symbol.toStringTag]: {
			value: 'CharacterData',
			configurable: true,
		},
	})),
});

if (!globalThis.CharacterData) {
	globalThis.CharacterData = CharacterData;
}

/**
 * Checks that an `unknown` value is {@link CharacterData}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link CharacterData} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link CharacterData}.
 */
export const isCharacterData = (value: unknown): value is CharacterData =>
	typeof globalThis.CharacterData !== 'undefined' &&
	value instanceof globalThis.CharacterData;

export default CharacterData;
