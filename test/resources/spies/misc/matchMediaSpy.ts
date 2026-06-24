import { rs } from '@rstest/core';
const DEFAULT_CRITERIA = (_query: string) => false;

export const matchMediaSpy = (criteria = DEFAULT_CRITERIA) =>
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: rs.fn().mockImplementation((query) => ({
			matches: criteria(query),
			media: query,
			onchange: null,
			addEventListener: rs.fn(),
			removeEventListener: rs.fn(),
			dispatchEvent: rs.fn(),
			/**
			 * @deprecated
			 */
			addListener: rs.fn(),
			/**
			 * @deprecated
			 */
			removeListener: rs.fn(),
		})),
	});
