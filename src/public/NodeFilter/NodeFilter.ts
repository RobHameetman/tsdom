import { type TupleOf, isFunction, isObject } from '@com.robhameetman/utils';
import implOf from '@/_internals/impl';

/**
 * A type alias for {@link NodeFilter} callbacks. Used in the `filter`
 * associations of {@link NodeIterator} and {@link TreeWalker} interfaces.
 */
export type NodeFilterCallback = TupleOf<NodeFilter>[0];

/**
 * A type alias for {@link NodeFilter} objects. Used in the `filter` associations
 * of {@link NodeIterator} and {@link TreeWalker} interfaces.
 */
export type NodeFilterObject = TupleOf<NodeFilter>[1];

/**
 * These constants can be used as `filter` return values.
 * @see https://dom.spec.whatwg.org/#concept-traversal-filter
 */
export enum NodeFilterResult {
	/**
	 * Indicates the current node in the filter is accepted.
	 */
	FilterAccept = 1,

	/**
	 * Indicates the current node in the filter is rejected.
	 */
	FilterReject = 2,

	/**
	 * Indicates the current node in the filter is skipped.
	 */
	FilterSkip = 3,
}

/**
 * These constants can be used for `whatToShow`.
 * @see https://dom.spec.whatwg.org/#concept-traversal-whattoshow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator#whattoshow
 */
export enum WhatToShow {
	/**
	 * Shows all nodes.
	 */
	ShowAll = 0xFFFFFFFF,

	/**
	 * Shows {@link Element} nodes.
	 */
	ShowElement = 0x1,

	/**
	 * Shows {@link Attr} nodes.
	 */
	ShowAttribute = 0x2,

	/**
	 * Shows {@link Text} nodes.
	 */
	ShowText = 0x4,

	/**
	 * Shows {@link CDATASection} nodes.
	 */
	ShowCDataSection = 0x8,

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	ShowEntityReference = 0x10,

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	ShowEntity = 0x20,

	/**
	 * Shows {@link ProcessingInstruction} nodes.
	 */
	ShowProcessingInstruction = 0x40,

	/**
	 * Shows {@link Comment} nodes.
	 */
	ShowComment = 0x80,

	/**
	 * Shows {@link Document} nodes.
	 */
	ShowDocument = 0x100,

	/**
	 * Shows {@link DocumentType} nodes.
	 */
	ShowDocumentType = 0x200,

	/**
	 * Shows {@link DocumentFragment} nodes.
	 */
	ShowDocumentFragment = 0x400,

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	ShowNotation = 0x800,
}

/**
 * {@link NodeFilter} objects can be used as filter for {@link NodeIterator} and
 * {@link TreeWalker} objects and also provide constants for their `whatToShow`
 * bitmask. A {@link NodeFilter} object is typically implemented as a function.
 *
 * @see https://dom.spec.whatwg.org/#interface-nodefilter
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
 *
 * @privateRemarks
 * The {@link global.NodeFilter} global defined in `lib.dom.d.ts` is an object
 * without a call signature even though it is technically a function, so we need
 * to cast the implementation to `typeof global.NodeFilter`.
 */
export const NodeFilter = implOf(
	function NodeFilter(this: NodeFilter) {},
) as unknown as typeof global.NodeFilter;

/**
 * Checks that an `unknown` value is a {@link NodeFilterCallback}.
 *
 * Requirements:
 *   - `value` must be an object with an `acceptNode()` function property.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeFilterCallback}.
 */
export const isNodeFilterCallback = (value: unknown): value is NodeFilterCallback =>
	isFunction(value);

/**
 * Checks that an `unknown` value is a {@link NodeFilterObject}.
 *
 * Requirements:
 *   - `value` must be an object with an `acceptNode()` function property.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeFilterObject}.
 */
export const isNodeFilterObject = (value: unknown): value is NodeFilterObject =>
	isObject(value) &&
	'acceptNode' in value &&
	isFunction(value.acceptNode);

/**
 * Checks that an `unknown` value is a {@link NodeFilter}.
 *
 * Requirements:
 *   - `value` must be function OR
 *   - `value` must be an object with an `acceptNode()` function property.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeFilter}.
 */
export const isNodeFilter = (value: unknown): value is NodeFilter =>
	isNodeFilterCallback(value) ||
	isNodeFilterObject(value);

/**
 * {@link NodeFilter} objects can be used as filter for {@link NodeIterator} and
 * {@link TreeWalker} objects and also provide constants for their `whatToShow`
 * bitmask. A {@link NodeFilter} object is typically implemented as a function.
 */
Object.defineProperties(NodeFilter, {
	/**
	 * Indicates the current node in the filter is accepted.
	 */
	FILTER_ACCEPT: {
		value: NodeFilterResult.FilterAccept,
		enumerable: true,
	},

	/**
	 * Indicates the current node in the filter is rejected.
	 */
	FILTER_REJECT: {
		value: NodeFilterResult.FilterReject,
		enumerable: true,
	},

	/**
	 * Indicates the current node in the filter is skipped.
	 */
	FILTER_SKIP: {
		value: NodeFilterResult.FilterSkip,
		enumerable: true,
	},

	/**
	 * Shows all nodes.
	 */
	SHOW_ALL: {
		value: WhatToShow.ShowAll,
		enumerable: true,
	},

	/**
	 * Shows {@link Element} nodes.
	 */
	SHOW_ELEMENT: {
		value: WhatToShow.ShowElement,
		enumerable: true,
	},

	/**
	 * Shows {@link Attr} nodes.
	 */
	SHOW_ATTRIBUTE: {
		value: WhatToShow.ShowAttribute,
		enumerable: true,
	},

	/**
	 * Shows {@link Text} nodes.
	 */
	SHOW_TEXT: {
		value: WhatToShow.ShowText,
		enumerable: true,
	},

	/**
	 * Shows {@link CDATASection} nodes.
	 */
	SHOW_CDATA_SECTION: {
		value: WhatToShow.ShowCDataSection,
		enumerable: true,
	},

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	SHOW_ENTITY_REFERENCE: {
		value: WhatToShow.ShowEntityReference,
		enumerable: true,
	},

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	SHOW_ENTITY: {
		value: WhatToShow.ShowEntity,
		enumerable: true,
	},

	/**
	 * Shows {@link ProcessingInstruction} nodes.
	 */
	SHOW_PROCESSING_INSTRUCTION: {
		value: WhatToShow.ShowProcessingInstruction,
		enumerable: true,
	},

	/**
	 * Shows {@link Comment} nodes.
	 */
	SHOW_COMMENT: {
		value: WhatToShow.ShowComment,
		enumerable: true,
	},

	/**
	 * Shows {@link Document} nodes.
	 */
	SHOW_DOCUMENT: {
		value: WhatToShow.ShowDocument,
		enumerable: true,
	},

	/**
	 * Shows {@link DocumentType} nodes.
	 */
	SHOW_DOCUMENT_TYPE: {
		value: WhatToShow.ShowDocumentType,
		enumerable: true,
	},

	/**
	 * Shows {@link DocumentFragment} nodes.
	 */
	SHOW_DOCUMENT_FRAGMENT: {
		value: WhatToShow.ShowDocumentFragment,
		enumerable: true,
	},

	/**
	 * @deprecated
	 * Legacy, no longer effective.
	 */
	SHOW_NOTATION: {
		value: WhatToShow.ShowNotation,
		enumerable: true,
	},
});

Object.seal(NodeFilter);

if (!globalThis.NodeFilter) {
	globalThis.NodeFilter = NodeFilter;
}

export default NodeFilter;
