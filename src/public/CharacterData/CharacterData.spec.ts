import isText from './isText';

describe('isText()', () => {
	it('should return true given a text node', () => {
		expect(isText(document.createTextNode('Hello, world!'))).toBe(true);
	});

	it('should return false given an HTML element', () => {
		expect(isText(document.createElement('div'))).toBe(false);
	});

	it('should return false given a comment node', () => {
		expect(isText(document.createComment('Hello, world!'))).toBe(false);
	});

	it('should return false given a document fragment', () => {
		expect(isText(document.createDocumentFragment())).toBe(false);
	});

	it('should return false given a non-node value', () => {
		expect(isText({})).toBe(false);
		expect(isText([])).toBe(false);
		expect(isText(null)).toBe(false);
		expect(isText(undefined)).toBe(false);
		expect(isText('Hello, world!')).toBe(false);
		expect(isText(123)).toBe(false);
		expect(isText(true)).toBe(false);
	});
});
