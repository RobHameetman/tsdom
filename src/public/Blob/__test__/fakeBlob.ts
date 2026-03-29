import { faker } from '@faker-js/faker';

export const fakeBlob = ({
	...overrideProps
}: Record<string, unknown> = {}) => ({
		size: faker.number.int({ min: 0, max: 10 }),
		type: faker.system.mimeType(),
		arrayBuffer: jest.fn(),
		bytes: jest.fn(),
		slice: jest.fn(),
		stream: jest.fn(),
		text: jest.fn(),
		...overrideProps,
	} as unknown as Blob & Record<string, unknown>);
