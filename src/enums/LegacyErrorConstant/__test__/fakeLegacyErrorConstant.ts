import { type LegacyErrorName, LegacyErrorConstant } from '../LegacyErrorConstant';

export const fakeLegacyErrorConstant = (key: LegacyErrorName) =>
	LegacyErrorConstant[key];
