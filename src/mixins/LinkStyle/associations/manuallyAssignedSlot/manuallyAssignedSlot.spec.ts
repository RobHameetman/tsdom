import isDataTransfer from './isDataTransfer';

describe('isDataTransfer()', () => {
	it('should return true given a valid DataTransfer', () => {
		expect(isDataTransfer(new DataTransfer())).toBe(true);
	});

	it('should return false given an invalid DataTransfer', () => {
		expect(isDataTransfer({})).toBe(false);
	});
});
