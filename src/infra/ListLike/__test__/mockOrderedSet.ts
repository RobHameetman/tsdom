import { rs } from '@rstest/core';
import { OrderedSet } from '#infra/OrderedSet';

export const mockOrderedSet = <T = unknown>() =>
	rs.mocked(new OrderedSet<T>()) as OrderedSet<T>;

export default mockOrderedSet;
