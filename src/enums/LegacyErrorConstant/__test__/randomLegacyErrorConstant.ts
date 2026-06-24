import { faker } from '@faker-js/faker';
import { LEGACY_ERROR_CODES, LegacyErrorConstant } from '../LegacyErrorConstant';

export const randomLegacyErrorConstant = () =>
	faker.helpers.arrayElement(LEGACY_ERROR_CODES) as LegacyErrorConstant;
