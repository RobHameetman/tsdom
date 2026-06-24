import isObject from '#_internals/utils/functions/isObject';
import { isSlot } from '#tree/ShadowTree/relationships/slots';
import type { Slot } from '#tree/ShadowTree/types/Slot';
import isAssigned from '#mixins/Slottable/algorithms/isAssigned';
import manuallyAssignedSlots from '#mixins/Slottable/associations/manuallyAssignedSlot';

/**
 * @see https://dom.spec.whatwg.org/#light-tree-slotables
 */
export type Slottables = Element | Text;

export interface AssignedSlottable extends Slottable {
	readonly assignedSlot: Slot;
}

export const Slottable = <T extends typeof global.Node['prototype'] = typeof global.Node['prototype']>(prototype: T) =>
	Object.defineProperties(prototype, {
		assignedSlot: {
			get(this: T & Slottable) {
				return manuallyAssignedSlots.get(this) || null;
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & Slottable;

/**
 * Checks that an `unknown` value is an {@link Node} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Node} node.
 */
export const isSlottable = (
	value: unknown,
): value is Slottable =>
	/**
	 * value
	 */
	isObject(value) &&
	/**
	 * value.assignedSlot
	 */
	'assignedSlot' in value &&
	(isSlot(value.assignedSlot) || value.assignedSlot === null);

/**
 * Checks that an `unknown` value is an assigned {@link Slottable}.
 *
 * Requirements:
 *   - `value` must be a {@link Slottable} with an `assignedSlot` that is not `null`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an assigned {@link Slottable}.
 */
export const isAssignedSlottable = (value: unknown): value is AssignedSlottable =>
	isSlottable(value) && isAssigned(value);

export default Slottable;
