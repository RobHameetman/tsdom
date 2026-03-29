import flattenOptions from './flattenOptions';

describe('flattenOptions()', () => {
	it('should return undefined given no options', () => {
		expect(flattenOptions()).toBeUndefined();
	});

	it('should return the boolean value when a boolean is provided', () => {
		expect(flattenOptions(true)).toBe(true);
		expect(flattenOptions(false)).toBe(false);
	});

	it('should return the `capture` property when an object is provided', () => {
		expect(flattenOptions({ capture: true })).toBe(true);
		expect(flattenOptions({ capture: false })).toBe(false);
		expect(flattenOptions({})).toBeUndefined();
	});
});
