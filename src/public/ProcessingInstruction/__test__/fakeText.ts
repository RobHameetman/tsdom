import { rs } from '@rstest/core';
import { faker } from '@faker-js/faker';
import DomNodeType from '#nodes/enums/DomNodeType';
import { fakeNode } from '../../Node/__test__';

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
		after: rs.fn(),
		appendData: rs.fn(),
		before: rs.fn(),
		deleteData: rs.fn(),
		insertData: rs.fn(),
		remove: rs.fn(),
		replaceData: rs.fn(),
		replaceWith: rs.fn(),
		splitText: rs.fn(() => []),
		substringData: rs.fn(() => ''),
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
