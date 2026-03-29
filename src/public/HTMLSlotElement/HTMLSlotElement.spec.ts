import isElement from './isElement';
import DomNodeNamespace from '../DomNodeNamespace';
import { fakeNode } from '../isNode/__test__';

describe('isElement()', () => {
	it('should return true given an HTML element', () => {
		expect(isElement(document.createElement('div'))).toBe(true);
	});

	it('should return false given an SVG Element', () => {
		expect(
			isElement(document.createElementNS(DomNodeNamespace.SVG, 'svg')),
		).toBe(false);
	});

	it('should return false given a Node that is not an ELEMENT_NODE', () => {
		expect(isElement(fakeNode({ nodeType: 2 }))).toBe(false);
	});
});
