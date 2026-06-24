import { faker } from '@faker-js/faker';
import DomNodeType from '#nodes/enums/DomNodeType';
import { fakeNode } from '../../../nodes/tree/Node/__test__';

export const fakeText = ({
	content = faker.lorem.sentence(),
	ssr = typeof window === 'undefined',
	...overrideProps
}: Record<string, unknown> = {}) => {

	const text = fakeNode({
		nodeType: DomNodeType.TEXT_NODE,
		assignedSlot: null,
		data: content,
		length: String(content).length,
		ownerDocument: null,
		nextElementSibling: null,
		previousElementSibling: null,
		textContent: content,
		wholeText: content,
		after: jest.fn(),
		appendData: jest.fn(),
		before: jest.fn(),
		deleteData: jest.fn(),
		insertData: jest.fn(),
		remove: jest.fn(),
		replaceData: jest.fn(),
		replaceWith: jest.fn(),
		splitText: jest.fn(() => []),
		substringData: jest.fn(() => ''),
	});

	Object.entries(overrideProps).forEach(([key, value]) => {
		const prop = Object.getOwnPropertyDescriptor(text, key) || {
			writable: false,
		};

		Object.defineProperty(text, key, {
			...prop,
			value,
		});
	});

	return text as Text;
};
