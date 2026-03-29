import { faker } from '@faker-js/faker';
import { fakeFileList } from '@/dom/files/isFileList/__test__';
import { fakeDataTransferItemList } from '@/dom/misc/isDataTransferItemList/__test__';

export const fakeDataTransfer = ({
	...overrideProps
}: Record<string, unknown> = {}) =>
	({
		dropEffect: faker.helpers.arrayElement([
			'none',
			'copy',
			'link',
			'move',
			'always',
		]),
		effectAllowed: faker.helpers.arrayElement([
			'none',
			'copy',
			'copyLink',
			'copyMove',
			'link',
			'linkMove',
			'move',
			'all',
			'uninitialized',
		]),
		eventPhase: faker.number.int({ min: 0, max: 2 }),
		isTrusted: faker.datatype.boolean(),
		files: fakeFileList(),
		items: fakeDataTransferItemList(),
		types: faker.helpers.arrayElements(['text/plain', 'text/html', 'text/uri-list']),
		clearData: jest.fn(),
		getData: jest.fn(),
		setData: jest.fn(),
		setDragImage: jest.fn(),
		...overrideProps,
	} as DataTransfer & Record<string, unknown>);
