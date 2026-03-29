import isBlob from './isBlob';

describe('isBlob()', () => {
	it('should return true given a valid Blob', () => {
		expect(isBlob(new Blob())).toBe(true);
	});

	it('should return false given an invalid Blob', () => {
		expect(isBlob({})).toBe(false);
	});
});
