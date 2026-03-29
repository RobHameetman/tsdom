// import implOf from '@/_internals/impl';
import LinkStyle from '@/mixins/LinkStyle';
import CharacterData from '@/public/CharacterData';
import { disposeTargetOf, targetOf } from '@/public/ProcessingInstruction/associations/target';

const withMixins = (prototype: ProcessingInstruction) =>
	LinkStyle(prototype);

/**
 * Represents a processing instruction Node in a DOM tree.
 */
export const ProcessingInstruction = function(this: ProcessingInstruction) {
	throw new TypeError('Failed to construct \'ProcessingInstruction\': Illegal constructor');
} as unknown as typeof global.ProcessingInstruction;

Object.defineProperties(ProcessingInstruction, {
	prototype: {
		value: Object.seal(withMixins(Object.create(CharacterData.prototype, {
			/**
			 * The read-only **`target`** property of the {@link ProcessingInstruction}
			 * interface represents the application to which the
			 * {@link ProcessingInstruction} is targeted.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/ProcessingInstruction/target
			 */
			target: {
				get(this: ProcessingInstruction) {
					return targetOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			[Symbol.dispose]: {
				value(this: ProcessingInstruction) {
					disposeTargetOf(this);

					if (Symbol.dispose in CharacterData.prototype) {
						(CharacterData.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: ProcessingInstruction) {
					disposeTargetOf(this);

					if (Symbol.asyncDispose in CharacterData.prototype) {
						await (CharacterData.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'ProcessingInstruction',
				configurable: true,
			},
		}))),
	},
});

Object.seal(ProcessingInstruction);

if (!globalThis.ProcessingInstruction) {
	globalThis.ProcessingInstruction = ProcessingInstruction;
}

/**
 * Checks that an `unknown` value is {@link ProcessingInstruction}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link ProcessingInstruction} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not {@link ProcessingInstruction}.
 */
export const isProcessingInstruction = (value: unknown): value is ProcessingInstruction =>
	typeof globalThis.ProcessingInstruction !== 'undefined' &&
	value instanceof globalThis.ProcessingInstruction;

export default ProcessingInstruction;
