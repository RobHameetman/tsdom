import List from '@/infra/List';
import Queue from '@/infra/Queue';
import Stack from '@/infra/Stack';
import { Transform, type TransformOptions } from 'node:stream';
import { ReadableStream, TransformStream } from 'node:stream/web';
import CSSToken from '@/selectors/enums/CSSToken';
import CodePoint from '@/selectors/enums/CodePoint';

const EOF = -1;

type Cursor = [CodePoint | null, CodePoint | null];

/**
 * A shared array buffer for use between different views.
 */
const buffer = new WeakMap<StreamOfCodePoints, SharedArrayBuffer>();
const controller = new WeakMap<StreamOfCodePoints, TransformStreamDefaultController<CodePoint>>();
// const chunks = new WeakMap<StreamOfCodePoints, Queue<string>>();
// const decoder = new TextDecoder();
const encoder = new TextEncoder();

const position = new WeakMap<StreamOfCodePoints, number>();

/**
 * Stores the view of upcoming code points.
 */
const view = new WeakMap<StreamOfCodePoints, Uint32Array>();
const cursor = new WeakMap<StreamOfCodePoints, Cursor>();

const bufferOf = (stream: StreamOfCodePoints, bufferSize = StreamOfCodePoints.DEFAULT_BUFFER_SIZE) => {
	return buffer.get(stream) || new SharedArrayBuffer(bufferSize * 4);
};

const initializeBufferOf = (stream: StreamOfCodePoints) => {
	if (!buffer.has(stream)) {
		buffer.set(stream, new SharedArrayBuffer(0, { maxByteLength: StreamOfCodePoints.MAX_BUFFER_SIZE }));
	}
};

const controllerOf = (stream: StreamOfCodePoints) => {
	return controller.get(stream) as TransformStreamDefaultController<CodePoint>;
};

const initializeControllerOf = (stream: StreamOfCodePoints, value: TransformStreamDefaultController<CodePoint>) => {
	if (!controller.has(stream)) {
		controller.set(stream, value);
	}
};

const chunksOf = (stream: StreamOfCodePoints) => {
	return chunks.get(stream) || new Queue<string>();
};

const hasChunks = (stream: StreamOfCodePoints) => {
	return chunksOf(stream).length > 0;
};

const nextChunkOf = (stream: StreamOfCodePoints) => {
	return chunksOf(stream).shift() || '';
};

const initializeChunksOf = (stream: StreamOfCodePoints) => {
	if (!chunks.has(stream)) {
		chunks.set(stream, new Queue<string>());
	}
};

const initializePositionOf = (stream: StreamOfCodePoints) => {
	if (!position.has(stream)) {
		position.set(stream, 0);
	}
};

const incrementPositionOf = (stream: StreamOfCodePoints, by = 1) => {
	const incremented = positionOf(stream) + (by > 0 ? by : 0);

	setPositionOf(stream, incremented);

	return incremented;
};

const decrementPositionOf = (stream: StreamOfCodePoints, by = 1) => {
	const decremented = positionOf(stream) - (by > 0 ? by : 0);

	setPositionOf(stream, decremented);

	return decremented;
};

const positionOf = (stream: StreamOfCodePoints) => {
	return position.get(stream) || 0;
};

const setPositionOf = (stream: StreamOfCodePoints, at: number) => {
	position.set(stream, at);
};

const initializeViewOf = (stream: StreamOfCodePoints) => {
	if (!view.has(stream)) {
		view.set(stream, new Uint32Array(bufferOf(stream), 0, 1));
	}
};

const viewOf = (stream: StreamOfCodePoints) => {
	return view.get(stream) || new Uint32Array(bufferOf(stream), 0, 1);
};

const addToViewOf = (stream: StreamOfCodePoints, chunk: string) => {
	viewOf(stream).set(encoder.encode(chunk), positionOf(stream));
};

const lengthOf = (stream: StreamOfCodePoints) => {
	return viewOf(stream)?.length || 0;
};

const cursorOf = (stream: StreamOfCodePoints) => {
	return cursor.get(stream) || [null, null];
};

const currentCodePointOf = (stream: StreamOfCodePoints) => {
	const [ current ] = cursorOf(stream);

	return current;
};

const nextCodePointOf = (stream: StreamOfCodePoints) => {
	const [ , next ] = cursorOf(stream);

	return next;
};

// const shiftCursorOf = (stream: StreamOfCodePoints, codePoint = null as CodePoint | null) => {
// 	cursor.set(stream, [nextCodePointOf(stream), codePoint]);
// };

// const setCursorOf = (stream: StreamOfCodePoints, to: Cursor) => {
// 	cursor.set(stream, to);
// };

// type StreamOfCodePoints = TransformStream<string, number>;

type CodePoints = Uint32Array<ArrayBuffer>;

interface StreamOfCodePoints extends ReadableStream<CodePoints> {
	// readonly current: CodePoint | null;
	// readonly next: CodePoint | null;
	// readonly advance: (by?: number) => number | null;
	// readonly consumeWhile: (predicate: (codepoint: CodePoint) => boolean) => Promise<string>;
	readonly consume: <T extends string = string>(codepoints?: number) => T;
	readonly consumeUntil: (codepoints: ReadonlyArray<CodePoint>) => Promise<string>;
	readonly nextCodePointIs: (codepoint: CodePoint | ((cp: CodePoint) => boolean), offset?: number) => boolean;
	readonly nextCodePointIsADigit: (offset?: number) => boolean;
	readonly nextCodePointsAre: (codepoints: ReadonlyArray<CodePoint>, offset?: number) => boolean;
	readonly nextCodePointIsOneOf: (codepoints: ReadonlyArray<CodePoint>, offset?: number) => boolean;
	readonly peek: (distance?: number, offset?: number) => Uint32Array<ArrayBufferLike>;
	// readonly reconsume: () => void;
	readonly DEFAULT_BUFFER_SIZE: number;
	readonly MAX_BUFFER_SIZE: number;
}

interface StreamOfCodePointsConstructor {
	new (input: string): StreamOfCodePoints;
	readonly prototype: StreamOfCodePoints;
	readonly DEFAULT_BUFFER_SIZE: number;
	readonly MAX_BUFFER_SIZE: number;
}

const StreamOfCodePoints = function(this: StreamOfCodePoints, input: string) {
	const stream = new TransformStream<string, CodePoint>({
		start: (controller) => {
			initializeBufferOf(this);
			initializeControllerOf(this, controller);
			initializeViewOf(this);
			// initializePositionOf(this);
		},
		transform: (chunk, controller) => {
			const view = viewOf(this);

			for (const char of chunk) {
				// controller.enqueue(char.charCodeAt(0));

				bufferOf(this).grow(encoder.encode(char).length);
				view[view.length] = char.codePointAt(0) as CodePoint;
			}
		},
		flush: (controller) => {
			// // Flush any remaining buffered characters
			// const view = viewOf(this);

			// for (let i = 0; i < view.length; i += 1) {
			// 	controller.enqueue(Atomics.load(view, i));
			// }
			Object.freeze(bufferOf(this));
		}
	});

	// initializeBufferOf(this);

	Object.setPrototypeOf(stream.readable, StreamOfCodePoints.prototype);

	stream.writable.getWriter().write(input);

	return stream.readable;
} as unknown as StreamOfCodePointsConstructor;

Object.defineProperties(StreamOfCodePoints, {
	prototype: Object.seal(Object.create(TransformStream.prototype, {
		current: {
			get(this: StreamOfCodePoints) {
				return cursorOf(this)[0];
			},
			configurable: true,
			enumerable: true,
		},
		// next: {
		// 	get(this: StreamOfCodePoints) {
		// 		return cursorOf(this)[1];
		// 	},
		// 	configurable: true,
		// 	enumerable: true,
		// },
		advance: {
			value(this: StreamOfCodePoints, by = 1) {
				const consumed = this.current;

				shiftCursorOf(this);

				if ('Atomics' in self) {
					Atomics.store(viewOf(this), 0, positionOf(this));
				}

				return consumed;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		// consumeWhile: {
		// 	value(this: StreamOfCodePoints, predicate: (codepoint: CodePoint) => boolean) {
		// 		const codePoints = [] as Array<CodePoint>;
		// 		const view = viewOf(this);

		// 		let offset = 0;
		// 		let codepoint = Atomics.load(view, positionOf(this) + offset);

		// 		while (codepoint) {
		// 			controllerOf(this)?.enqueue(codepoint);
		// 			offset++;
		// 			codepoint = Atomics.load(view, positionOf(this) + offset);
		// 		}

		// 		return String.fromCodePoint(...codePoints);
		// 	},
		// 	configurable: true,
		// 	enumerable: true,
		// 	writable: true,
		// },
		consume: {
			value(this: StreamOfCodePoints, codepoints = 1) {
				let consumed = new Uint32Array(codepoints);
				let eof = false;

				for (let i = 0; i < codepoints; i += 1) {
					const offset = positionOf(this) + i;

					if (offset >= lengthOf(this)) {
						consumed[i] = EOF;
						eof = true;

						break;
					}

					consumed[i] = Atomics.load(viewOf(this), positionOf(this) + i);

					controllerOf(this)?.enqueue(consumed[i]);
					incrementPositionOf(this);
				}

				return String.fromCodePoint(...(eof ? consumed.slice(0, -1) : consumed));
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		consumeUntil: {
			value(this: StreamOfCodePoints, codepoints: ReadonlyArray<CodePoint>) {
				let matching = new Uint32Array(codepoints.length);
				const view = viewOf(this);

				let done = false;
				let offset = 0;
				let codepoint = Atomics.load(view, positionOf(this) + offset);

				do {
					// codepoint = Atomics.load(view, positionOf(this) + offset);
					// controllerOf(this)?.enqueue(codepoint);

					if (!codepoint) {
						done = true;
					}

					if (codepoints[offset] === codepoint) {
						matching[offset] = codepoint;
					} else if (matching.length) {
						for (let i = 0; i < matching.length; i += 1) {
							matching[i] = 0;
						}
					}

					if (matching.length === codepoints.length) {
						done = true;
					} else {
						codepoint = Atomics.load(view, positionOf(this) + offset++);
					}
				} while (!done);

				let chunk = String.fromCodePoint(...matching);

				controllerOf(this)?.enqueue(matching);

				return String.fromCodePoint(...codepoints);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		nextCodePointsAre: {
			value(this: StreamOfCodePoints, codepoints: ReadonlyArray<CodePoint>, offset = 0) {
				return this.peek(codepoints.length, offset).every(
					(codepoint, index) => {
						if (codepoints[index] === CodePoint.Digit) {
							return (codepoint & CodePoint.Digit) === codepoint;
						}

						return codepoint === codepoints[index];
					},
				);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		nextCodePointIs: {
			value(this: StreamOfCodePoints, codepoint: CodePoint | ((cp: CodePoint) => boolean), offset = 0) {
				return this.peek(1, offset).some(
					(cp) => typeof codepoint === 'function'
						? codepoint(cp)
						: cp === codepoint
				);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		nextCodePointIsADigit: {
			value(this: StreamOfCodePoints, offset = 0) {
				return this.peek(1, offset).some(
					(codepoint) => (codepoint & CodePoint.Digit) === codepoint,
				);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		nextCodePointIsOneOf: {
			value(this: StreamOfCodePoints, codepoints: ReadonlyArray<CodePoint>, offset = 0) {
				return this.peek(1, offset).some(
					(codepoint, index) => codepoint === codepoints[index]
				);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		peek: {
			value(this: StreamOfCodePoints, distance = 1, offset = 0) {
				const view = viewOf(this);
				const peek = new Uint32Array(distance);
				const position = positionOf(this) + offset;

				for (let i = 0; i < distance; i += 1) {
					peek[i] = Atomics.load(view, position + i);
				}

				return peek;
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		reconsume: {
			value(this: StreamOfCodePoints) {
				/**
				 * Not sure we need this.
				 */
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
	})),
	DEFAULT_BUFFER_SIZE: {
		value: 4096,
		enumerable: true,
	},
	MAX_BUFFER_SIZE: {
		value: Number.MAX_SAFE_INTEGER,
		enumerable: true,
	},
	[Symbol.dispose]: {
		async value(this: StreamOfCodePoints) {
			this.cancel();
		},
		configurable: true
	}
});




const codePointStream = (input: string | Uint32Array<ArrayBuffer>) => {
	if (typeof input === 'string') {
		codepoints = Uint32Array.from(
			[...input].map((char) => char.codePointAt(0))
		);
	} else {
		codepoints = input;
	}

	return codepoints;
};

const filterCodePoints = () => {
	//
}

const peek = (offset = 1) => {
	const index = cursor + offset;

	if (index < codepoints.length) {
		const codepoint = codepoints[index];

		return codepoint !== undefined
			? codepoint
			: EOF;
	}

	return EOF;
};

export const consumeComments = async (stream: StreamOfCodePoints) => {
	if (stream.nextCodePointsAre([CodePoint.Solidus, CodePoint.Asterisk])) {
		stream.consumeUntil([CodePoint.Asterisk, CodePoint.Solidus]);
	}
};

/**
 * This section describes how to consume an ident sequence from a stream of code
 * points. It returns a string containingthe largest name that can be formed
 * from adjacent code points in the stream, starting from the first.
 *
 * @see https://drafts.csswg.org/css-syntax-3/#consume-name
 *
 * @param stream
 */
export const consumeAnIdentSequence = async (stream: StreamOfCodePoints) => {
	let [ number ] = consumeNumber(stream);
};

/**
 * @see https://drafts.csswg.org/css-syntax-3/#consume-number
 *
 * @remarks
 * This algorithm does not do the verification of the first few code points that
 * are necessary to ensure a number can be obtained from the stream. Ensure that
 * the stream starts with a number before calling this algorithm.
 *
 * @param stream
 */
export const consumeNumber = (stream: StreamOfCodePoints) => {
	let type = 'integar' as 'integer' | 'number';
	let numberPart = '';
	let exponentPart = '';
	let signCharacter: '+' | '-' | undefined;

	if (stream.nextCodePointIsOneOf([CodePoint.Plus, CodePoint.HyphenMinus])) {
		const sign = stream.consume<'+' | '-'>();

		numberPart += sign;
		signCharacter = sign;
	}

	while (stream.nextCodePointIsADigit()) {
		numberPart += stream.consume();
	}

	if (stream.nextCodePointsAre([CodePoint.FullStop, CodePoint.Digit])) {
		numberPart += stream.consume();

		while (stream.nextCodePointIsADigit()) {
			numberPart += stream.consume();
		}

		type = 'number';
	}

	if (stream.nextCodePointIsOneOf([CodePoint.LatinCapitalE, CodePoint.LatinSmallE]) && stream.nextCodePointIsOneOf([CodePoint.Plus, CodePoint.HyphenMinus, CodePoint.Digit], 1) && stream.nextCodePointIsADigit(2)) {
		stream.consume();

		if (stream.nextCodePointIsOneOf([CodePoint.Plus, CodePoint.HyphenMinus])) {
			exponentPart += stream.consume<'+' | '-'>();
		}

		while (stream.nextCodePointIsADigit()) {
			exponentPart += stream.consume();
		}

		type = 'number';
	}

	let value = Number(numberPart);

	if (exponentPart) {
		value *= 10 ** Number.parseInt(exponentPart, 10);
	}

	return [value, type, signCharacter] as const;
};

export const consumeNumericToken = async (stream: StreamOfCodePoints) => {
	let [ number ] = consumeNumber(stream);
};

  //   while (stream.current !== null) {
  //     stream.advance();
  //   }

  //   if (stream.current !== null) {
  //     stream.advance();
  //   }
  // }
// };

export default consumeComments;
