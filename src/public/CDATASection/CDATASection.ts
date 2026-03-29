import Slottable from '@/mixins/Slottable';

// export const CDATA_SECTION_CONSTRUCTOR_KEY = Symbol('TSDom:Constructor:CDATASection');

const withMixins = (prototype: Text) =>
	Slottable(prototype);

/**
 * Represents a CDATA Section Node in a DOM tree.
 */
export const CDATASection = function(this: CDATASection) {
	throw new TypeError('Failed to construct \'CDATASection\': Illegal constructor');
} as unknown as typeof global.CDATASection;

Object.defineProperties(CDATASection, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Text.prototype, {
			constructor: {
				value: CDATASection,
				configurable: true,
				enumerable: false,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: CDATASection) {
					if (Symbol.dispose in CharacterData.prototype) {
						(CharacterData.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: CDATASection) {
					if (Symbol.asyncDispose in CharacterData.prototype) {
						await (CharacterData.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'CDATASection',
				configurable: true,
			},
		}))),
	},
});

Object.seal(CDATASection);

if (!globalThis.CDATASection) {
	globalThis.CDATASection = CDATASection;
}

/**
 * Checks that an `unknown` value is a {@link CDATASection}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link CDATASection} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CDATASection}.
 */
export const isCDATASection = (value: unknown): value is CDATASection =>
	typeof globalThis.CDATASection !== 'undefined' &&
	value instanceof globalThis.CDATASection;

export default CDATASection;
