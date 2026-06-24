import { jest } from '@jest/globals';
import { OrderedSet } from '#infra/OrderedSet';

export const mockOrderedSet = <T = unknown>() =>
	jest.mocked(new OrderedSet<T>()) as OrderedSet<T>;

export default mockOrderedSet;
