import type { ShadowTree } from '@/tree/ShadowTree';

/**
 * @see https://dom.spec.whatwg.org/#concept-tree
 */

export const shadowTree = new WeakMap<ShadowRoot, ShadowTree>();

export default shadowTree;
