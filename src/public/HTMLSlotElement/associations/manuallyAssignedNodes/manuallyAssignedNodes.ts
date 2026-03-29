import type List from '@/infra/List';
import type { Slottables } from '@/nodes/mixins/Slottable';

/**
 * @see https://html.spec.whatwg.org/multipage/scripting.html#manually-assigned-nodes
 */
export type ManuallyAssignedNodes = List<Slottables>;

export const manuallyAssignedNodes = new WeakMap<HTMLSlotElement, ManuallyAssignedNodes>();

export default manuallyAssignedNodes;
