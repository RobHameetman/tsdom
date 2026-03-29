import { isLegacyErrorConstant } from './LegacyErrorConstant';

describe('isLegacyErrorConstant()', () => {
	it('should return true given the string value "http://www.w3.org/1999/xhtml"', () => {
		expect(isLegacyErrorConstant('http://www.w3.org/1999/xhtml')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/2000/svg"', () => {
		expect(isLegacyErrorConstant('http://www.w3.org/2000/svg')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/1998/Math/MathML"', () => {
		expect(isLegacyErrorConstant('http://www.w3.org/1998/Math/MathML')).toBe(true);
	});

	it('should return false given an invalid namespace URI', () => {
		expect(isLegacyErrorConstant('http://www.w3.org/1999/invalidnamespace')).toBe(
			false,
		);
	});

	it('should return false given an empty string', () => {
		expect(isLegacyErrorConstant('')).toBe(false);
	});
});
