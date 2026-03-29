import { isDocumentType } from './DocumentType';

describe('isDocumentType()', () => {
	it('should return true given a document fragment', () => {
		expect(isDocumentType(document.createDocumentFragment())).toBe(true);
	});

	it('should return false given a text node', () => {
			expect(isDocumentType(document.createTextNode('Hello, world!'))).toBe(false);
		});

		it('should return false given an HTML element', () => {
			expect(isDocumentType(document.createElement('div'))).toBe(false);
		});

		it('should return false given a comment node', () => {
			expect(isDocumentType(document.createComment('Hello, world!'))).toBe(false);
		});

		it('should return false given a non-node value', () => {
			expect(isDocumentType({})).toBe(false);
			expect(isDocumentType([])).toBe(false);
			expect(isDocumentType(null)).toBe(false);
			expect(isDocumentType(undefined)).toBe(false);
			expect(isDocumentType('Hello, world!')).toBe(false);
			expect(isDocumentType(123)).toBe(false);
			expect(isDocumentType(true)).toBe(false);
		});
});
