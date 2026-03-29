import { isDomNodeNamespace } from './DomNodeNamespace';

describe('isDomNodeNamespace()', () => {
	it('should return true given the string value "http://www.w3.org/1999/xhtml"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/1999/xhtml')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/2000/svg"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/2000/svg')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/1998/Math/MathML"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/1998/Math/MathML')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/XML/1998/namespace"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/XML/1998/namespace')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/2000/xmlns/"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/2000/xmlns/')).toBe(true);
	});

	it('should return true given the string value "http://www.w3.org/1999/xlink"', () => {
		expect(isDomNodeNamespace('http://www.w3.org/1999/xlink')).toBe(true);
	});

	it('should return false given an invalid namespace URI', () => {
		expect(isDomNodeNamespace('http://www.w3.org/1999/invalidnamespace')).toBe(
			false,
		);
	});

	it('should return false given an empty string', () => {
		expect(isDomNodeNamespace('')).toBe(false);
	});
});
