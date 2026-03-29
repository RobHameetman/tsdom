import { isNumber } from '@com.robhameetman/utils';
import List from '@/infra/List';
import OrderedSet from '@/infra/OrderedSet';
import Stack from '@/infra/Stack';
import Queue from '@/infra/Queue';

export type BoundaryPoint = [Node, number];

/**
 * Checks that an `unknown` value is an {@link AbstractRange}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `AbstractRange`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link AbstractRange}.
 */
export const isBoundaryPoint = (value: unknown): value is BoundaryPoint =>
	(
		value instanceof List ||
		value instanceof OrderedSet ||
		value instanceof Stack ||
		value instanceof Queue ||
		value instanceof Array
	) &&
	value.length === 2 &&
	value[0] instanceof Node &&
	isNumber(value[1]);
