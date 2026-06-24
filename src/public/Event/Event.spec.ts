import { rs, type Mock } from '@rstest/core';
import EventTarget, { isEventTarget } from './EventTarget';
import { fakeEventTarget } from './__test__';

describe('EventTarget', () => {
	let listening: Mock | null = null;
	let notListening: Mock | null = null;
	let result: EventTarget | null = null;

	beforeAll(() => {
		listening = rs.fn();
		notListening = rs.fn();
	});

	beforeEach(() => {
		result = EventTarget();
	});

	afterEach(() => {
		result = null;
	});

	afterAll(() => {
		listening?.mockReset();
		notListening?.mockReset();

		listening = null;
		notListening = null;
	});

	it('should have the Object constructor as its prototype', () => {
		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
	});

	it('should be able to add event listeners', () => {
		expect(result).toHaveProperty('addEventListener', expect.any(Function));
		expect(() => result?.addEventListener('click', listening!)).not.toThrow(expect.any(Error));
	});

	it('should be able to dispatch an event', () => {
		expect(result).toHaveProperty('dispatchEvent', expect.any(Function));
		expect(() => result?.dispatchEvent(new Event('click'))).not.toThrow(expect.any(Error));
		expect(() => result?.dispatchEvent(new Event('click'))).not.toThrow(expect.any(Error));
	});

	it('should dispatch events to listeners for the correct type', () => {
		expect(listening).toHaveBeenCalledTimes(1);
	});

	it('should not dispatch events to listeners for the wrong type', () => {
		expect(notListening).toHaveBeenCalledTimes(0);
	});

	it('should be able to remove event listeners', () => {
		expect(result).toHaveProperty('removeEventListener', expect.any(Function));
		expect(() => result?.removeEventListener('click', listening!)).not.toThrow(expect.any(Error));
	});
});

describe('isEventTarget()', () => {
	it('should return true given a valid EventTarget', () => {
		expect(isEventTarget(EventTarget())).toBe(true);
	});

	it('should return false given an invalid EventTarget', () => {
		expect(isEventTarget(Object.setPrototypeOf(EventTarget(), null))).toBe(false);
	});
});
