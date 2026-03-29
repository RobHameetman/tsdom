import isDocumentFragment from './isDocumentFragment';

describe('isDocumentFragment()', () => {
	it('should return true given a document fragment', () => {
		expect(isDocumentFragment(document.createDocumentFragment())).toBe(true);
	});

	it('should return false given a text node', () => {
			expect(isDocumentFragment(document.createTextNode('Hello, world!'))).toBe(false);
		});

		it('should return false given an HTML element', () => {
			expect(isDocumentFragment(document.createElement('div'))).toBe(false);
		});

		it('should return false given a comment node', () => {
			expect(isDocumentFragment(document.createComment('Hello, world!'))).toBe(false);
		});

		it('should return false given a non-node value', () => {
			expect(isDocumentFragment({})).toBe(false);
			expect(isDocumentFragment([])).toBe(false);
			expect(isDocumentFragment(null)).toBe(false);
			expect(isDocumentFragment(undefined)).toBe(false);
			expect(isDocumentFragment('Hello, world!')).toBe(false);
			expect(isDocumentFragment(123)).toBe(false);
			expect(isDocumentFragment(true)).toBe(false);
		});
});
