import { rs } from '@rstest/core';
import AbortSignal from '../AbortSignal';
import EventTarget from '../../EventTarget';

export const fakeAbortSignal = ({ ...overrides } = {} as Record<string, unknown>) => {
	const abortSignal = Object.create(Object.assign(rs.mocked(AbortSignal.prototype), overrides));

	EventTarget.call(abortSignal);

	return abortSignal as AbortSignal;
};

export default fakeAbortSignal;
