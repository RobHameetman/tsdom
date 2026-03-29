import { jest } from '@jest/globals';
import { isListLike } from './ListLike';
import List from '../List';
import OrderedSet from '../OrderedSet';
import Queue from '../Queue';
import Stack from '../Stack';

describe('isListLike()', () => {
	it('should return true given an array', () => {
		expect(isListLike([])).toBe(true);
		expect(isListLike([1, 2, 3])).toBe(true);
		expect(isListLike(Object.freeze([]))).toBe(true);
		expect(isListLike(Object.freeze([1, 2, 3]))).toBe(true);
	});

	it('should return true given a list', () => {
		expect(isListLike(new List())).toBe(true);
		expect(isListLike(new List(1, 2, 3))).toBe(true);
		expect(isListLike(Object.freeze(new List()))).toBe(true);
		expect(isListLike(Object.freeze(new List(1, 2, 3)))).toBe(true);
	});

	it('should return true given an ordered set', () => {
		expect(isListLike(new OrderedSet())).toBe(true);
		expect(isListLike(new OrderedSet(1, 2, 3))).toBe(true);
		expect(isListLike(Object.freeze(new OrderedSet()))).toBe(true);
		expect(isListLike(Object.freeze(new OrderedSet(1, 2, 3)))).toBe(true);
	});

	it('should return true given a queue', () => {
		expect(isListLike(new Queue())).toBe(true);
		expect(isListLike(new Queue(1, 2, 3))).toBe(true);
		expect(isListLike(Object.freeze(new Queue()))).toBe(true);
		expect(isListLike(Object.freeze(new Queue(1, 2, 3)))).toBe(true);
	});

	it('should return true given a stack', () => {
		expect(isListLike(new Stack())).toBe(true);
		expect(isListLike(new Stack(1, 2, 3))).toBe(true);
		expect(isListLike(Object.freeze(new Stack()))).toBe(true);
		expect(isListLike(Object.freeze(new Stack(1, 2, 3)))).toBe(true);
	});

	it('should return true given an Int8Array', () => {
		expect(isListLike(new Int8Array())).toBe(true);
		expect(isListLike(new Int8Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Int8Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Int8Array(Object.freeze(new ArrayBuffer(24))))).toBe(true);
	});

	it('should return true given a Uint8Array', () => {
		expect(isListLike(new Uint8Array())).toBe(true);
		expect(isListLike(new Uint8Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Uint8Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Uint8Array(Object.freeze(new ArrayBuffer(24))))).toBe(true);
	});

	it('should return true given a Uint8ClampedArray', () => {
		expect(isListLike(new Uint8ClampedArray())).toBe(true);
		expect(isListLike(new Uint8ClampedArray([1, 2, 3]))).toBe(true);
		expect(isListLike(new Uint8ClampedArray(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Uint8ClampedArray(Object.freeze(new ArrayBuffer(24))))).toBe(true);
	});

	it('should return true given an Int16Array', () => {
		expect(isListLike(new Int16Array())).toBe(true);
		expect(isListLike(new Int16Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Int16Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Int16Array(Object.freeze(new ArrayBuffer(48))))).toBe(true);
	});

	it('should return true given a Uint16Array', () => {
		expect(isListLike(new Uint16Array())).toBe(true);
		expect(isListLike(new Uint16Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Uint16Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Uint16Array(Object.freeze(new ArrayBuffer(48))))).toBe(true);
	});

	it('should return true given an Int32Array', () => {
		expect(isListLike(new Int32Array())).toBe(true);
		expect(isListLike(new Int32Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Int32Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Int32Array(Object.freeze(new ArrayBuffer(96))))).toBe(true);
	});

	it('should return true given a Uint32Array', () => {
		expect(isListLike(new Uint32Array())).toBe(true);
		expect(isListLike(new Uint32Array([1, 2, 3]))).toBe(true);
		expect(isListLike(new Uint32Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Uint32Array(Object.freeze(new ArrayBuffer(96))))).toBe(true);
	});

	it('should return true given a Float32Array', () => {
		expect(isListLike(new Float32Array())).toBe(true);
		expect(isListLike(new Float32Array([1.5, 2.5, 3.5]))).toBe(true);
		expect(isListLike(new Float32Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Float32Array(Object.freeze(new ArrayBuffer(96))))).toBe(true);
	});

	it('should return true given a Float64Array', () => {
		expect(isListLike(new Float64Array())).toBe(true);
		expect(isListLike(new Float64Array([1.5, 2.5, 3.5]))).toBe(true);
		expect(isListLike(new Float64Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new Float64Array(Object.freeze(new ArrayBuffer(192))))).toBe(true);
	});

	it('should return true given a BigInt64Array', () => {
		expect(isListLike(new BigInt64Array())).toBe(true);
		expect(isListLike(new BigInt64Array([1n, 2n, 3n]))).toBe(true);
		expect(isListLike(new BigInt64Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new BigInt64Array(Object.freeze(new ArrayBuffer(192))))).toBe(true);
	});

	it('should return true given a BigUint64Array', () => {
		expect(isListLike(new BigUint64Array())).toBe(true);
		expect(isListLike(new BigUint64Array([1n, 2n, 3n]))).toBe(true);
		expect(isListLike(new BigUint64Array(Object.freeze(new ArrayBuffer())))).toBe(true);
		expect(isListLike(new BigUint64Array(Object.freeze(new ArrayBuffer(192))))).toBe(true);
	});

	it('should return true given a Set', () => {
		expect(isListLike(new Set())).toBe(true);
		expect(isListLike(new Set([1, 2, 3]))).toBe(true);
		expect(isListLike(Object.freeze(new Set()))).toBe(true);
		expect(isListLike(Object.freeze(new Set([1, 2, 3])))).toBe(true);
	});

	it('should return false given an object', () => {
		expect(isListLike({})).toBe(false);
		expect(isListLike({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(false);
		expect(isListLike(Object.freeze({}))).toBe(false);
		expect(isListLike(Object.freeze({ 0: 1, 1: 2, 2: 3, length: 3 }))).toBe(false);
	});

	it('should return false given a string', () => {
		expect(isListLike('')).toBe(false);
		expect(isListLike(Object.freeze(''))).toBe(false);
		expect(isListLike('abc')).toBe(false);
		expect(isListLike(Object.freeze('abc'))).toBe(false);
	});

	it('should return false given null', () => {
		expect(isListLike(null)).toBe(false);
	});

	it('should return false given undefined', () => {
		expect(isListLike(undefined)).toBe(false);
	});
});
