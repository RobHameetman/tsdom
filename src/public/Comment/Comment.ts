// import implOf from '@/_internals/impl';
import { isSlottable } from '@/mixins/Slottable';
import { setGetTheParentOf } from '@/public/EventTarget/associations/getTheParent';
import CharacterData from '@/public/CharacterData';
import { setDataOf } from '@/public/CharacterData/associations/data';
import { initializeNodeDocumentOf } from '@/public/Node/associations/nodeDocument';

/**
 * Represents textual notations within markup; although it is generally not
 * visually shown, such comments are available to be read in the source view.
 */
export const Comment = function(this: Comment, data = '') {
	initializeNodeDocumentOf(this, document);

	setGetTheParentOf(this, (_event: Event) => {
		if (isSlottable(this) && this.assignedSlot !== null) {
			return this.assignedSlot as EventTarget;
		}

		return this.parentNode as EventTarget;
	});

	setDataOf(this, data);
} as unknown as typeof global.Comment;

// export const Comment = implOf<typeof global.Comment>(
// 	function Comment(this: Comment, data = '') {
// 		// /* @ts-expect-error - Expected 1 arguments, but got 4. */
// 		// CharacterData.call(this, DomNodeType.COMMENT_NODE, data, CHARACTER_DATA_CONSTRUCTOR_KEY);

// 		return CharacterData.call(this);
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(Comment, {
	prototype: {
		value: Object.seal(Object.create(CharacterData.prototype, {
			constructor: {
				value: Comment,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: CharacterData) {
					if (Symbol.dispose in CharacterData.prototype) {
						(CharacterData.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: CharacterData) {
					if (Symbol.asyncDispose in CharacterData.prototype) {
						await (CharacterData.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Comment',
				configurable: true,
			},
		})),
	},
});

Object.seal(Comment);

if (!globalThis.Comment) {
	globalThis.Comment = Comment;
}

/**
 * Checks that an `unknown` value is a {@link Comment}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Comment} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Comment}.
 */
export const isComment = (value: unknown): value is Comment =>
	typeof globalThis.Comment !== 'undefined' &&
	value instanceof globalThis.Comment;

export default Comment;
