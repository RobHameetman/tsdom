import { rs } from '@rstest/core';
import { faker } from '@faker-js/faker';

export const fakeBlob = ({
	...overrideProps
}: Record<string, unknown> = {}) => ({
		size: faker.number.int({ min: 0, max: 10 }),
		type: faker.system.mimeType(),
		arrayBuffer: rs.fn(),
		bytes: rs.fn(),
		slice: rs.fn(),
		stream: rs.fn(),
		text: rs.fn(),
		...overrideProps,
	} as unknown as Blob & Record<string, unknown>);
