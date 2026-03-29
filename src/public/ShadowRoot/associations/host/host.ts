import host, { type DocumentFragmentHost } from '@/public/DocumentFragment/associations/host';

/**
 * @see https://dom.spec.whatwg.org/#shadowroot-slot-assignment
 */
export type ShadowRootHost = Exclude<DocumentFragmentHost, null>;

export default host as WeakMap<ShadowRoot, ShadowRootHost>;
