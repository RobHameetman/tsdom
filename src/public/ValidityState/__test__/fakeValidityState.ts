import { faker } from '@faker-js/faker';

export const fakeValidityState = ({
	...overrides
}: Record<string, unknown> = {}) => ({
	badInput: faker.datatype.boolean(),
	customError: faker.datatype.boolean(),
	patternMismatch: faker.datatype.boolean(),
	rangeOverflow: faker.datatype.boolean(),
	rangeUnderflow: faker.datatype.boolean(),
	stepMismatch: faker.datatype.boolean(),
	tooLong: faker.datatype.boolean(),
	tooShort: faker.datatype.boolean(),
	typeMismatch: faker.datatype.boolean(),
	valueMissing: faker.datatype.boolean(),
	[Symbol.toStringTag]: 'ValidityState',
	...overrides,
} as unknown as ValidityState & Record<string, unknown>);

export default fakeValidityState;
