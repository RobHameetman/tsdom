import { isFunction, isNumber, isObject, isString } from '@com.robhameetman/utils';

export const Blob = function(blobParts?: BlobPart[], options?: BlobPropertyBag) {
	return Object.create(Object.prototype, {
		size: {
			value: 0,
			enumerable: true,
		},
		type: {
			value: '',
			enumerable: true,
		},
		arrayBuffer: {
			value: async () => new ArrayBuffer(0),
			enumerable: true,
		},
		bytes: {
			value: async () => new Uint8Array(0),
			enumerable: true,
		},
		slice: {
			value: (start?: number, end?: number) => new Blob(),
			enumerable: true,
		},
		stream: {
			value: () => new ReadableStream<Uint8Array>(),
			enumerable: true,
		},
		text: {
			value: async () => '',
			enumerable: true,
		},
		constructor: {
			value: Blob,
			configurable: true,
			writable: true,
		},
		[Symbol.toStringTag]: {
			value: 'Blob',
			configurable: true,
		},
	});
};

/**
 * Checks that an `unknown` value is a valid {@link Blob}.
 *
 * Requirements:
 *   - `value` must be a valid instance of {@link Blob} or an object with all
 *     the properties and methods of a {@link Blob}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Blob}.
 */
export const isBlob = (value: unknown): value is Blob =>
	/**
	 * value
	 */
	typeof window !== 'undefined'
		? value instanceof Blob
		: (
			isObject(value) &&
			/**
			 * value.size
			 */
			'size' in value &&
			isNumber(value.size) &&
			/**
			 * value.type
			 */
			'type' in value &&
			isString(value.type) &&
			/**
			 * value.arrayBuffer()
			 */
			'arrayBuffer' in value &&
			isFunction(value.arrayBuffer) &&
			/**
			 * value.bytes()
			 */
			'bytes' in value &&
			isFunction(value.bytes) &&
			/**
			 * value.slice()
			 */
			'slice' in value &&
			isFunction(value.slice) &&
			/**
			 * value.stream
			 */
			'stream' in value &&
			isString(value.stream) &&
			/**
			 * value.text()
			 */
			'text' in value &&
			isFunction(value.text)
		);

export default isBlob;
