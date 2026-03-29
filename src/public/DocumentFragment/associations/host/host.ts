/**
 * @see https://dom.spec.whatwg.org/#concept-documentfragment-host
 */
export type DocumentFragmentHost = Element | null;

export const host = new WeakMap<DocumentFragment, DocumentFragmentHost>();

export default host;
