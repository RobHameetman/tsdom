import { isType } from '@com.robhameetman/utils';
import NodeTree from '@/tree/NodeTree';

export interface DocumentTree<H extends Node = Node> extends NodeTree<Document, H> {
	/* Mutations */
	adopt<N extends Document = Document>(node: N): void;
}

/**
 * Checks that an `unknown` value is a {@link DocumentTree}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Tree`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link DocumentTree}.
 */
export const isDocumentTree = (value: unknown): value is DocumentTree =>
	value instanceof DocumentTree;

Object.seal(DocumentTree);

export default DocumentTree;
