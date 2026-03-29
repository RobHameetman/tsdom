import attachAShadowRoot from '@/public/Element/algorithms/attachAShadowRoot';
import cloneASingleNode from '@/public/Node/algorithms/cloneASingleNode';
import { declarativeOf, setDeclarativeOf } from '@/public/ShadowRoot/associations/declarative';
import { delegatesFocusOf } from '@/public/ShadowRoot/associations/delegatesFocus';
import { serializableOf } from '@/public/ShadowRoot/associations/serializable';
import { customElementRegistryOf } from '@/public/ShadowRoot/associations/customElementRegistry';
import { keepCustomElementRegistryNullOf, setKeepCustomElementRegistryNullOf } from '@/public/ShadowRoot/associations/keepCustomElementRegistryNull';
import { slotAssignmentOf } from '@/public/ShadowRoot/associations/slotAssignment';
import { isShadowHost } from '@/tree/ShadowTree/relationships/shadowRoots';

/**
 * Determines whether two nodes are equal.
 * @internal
 *
 * @see https://dom.spec.whatwg.org/#concept-node-clone
 *
 * @param node - A node to check.
 * @param other - Another node to compare with the first node.
 *
 * @returns A boolean which is `true` if both nodes are equal, `false`
 * otherwise.
 */
export const cloneANode = (
	node: Node,
	document = node.ownerDocument as Document,
	subtree = false,
	parent = null as Node | null,
	fallbackRegistry = null as CustomElementRegistry | null,
) => {
	let copy = cloneASingleNode(node, document, fallbackRegistry) as Node;

	/**
	 * @TODO Run any cloning steps defined for node in other applicable
	 * specifications and pass node, copy, and subtree as parameters.
	 */

	if (parent) {
		parent.appendChild(copy);
	}

	if (subtree) {
		node.childNodes.forEach((child) => {
			cloneANode(child, document, subtree, copy, fallbackRegistry);
		});
	}

	if (node instanceof Element && isShadowHost(node) && node.shadowRoot?.clonable) {
		let shadowRootRegistry = customElementRegistryOf(node.shadowRoot);

		/**
		 * @TODO If shadowRootRegistry is a global custom element registry, then set
		 * shadowRootRegistry to document’s effective global custom element registry.
		 */

		attachAShadowRoot(
			copy as Element,
			node.shadowRoot.mode,
			true,
			serializableOf(node.shadowRoot),
			delegatesFocusOf(node.shadowRoot),
			slotAssignmentOf(node.shadowRoot),
			shadowRootRegistry,
		);

		setDeclarativeOf((copy as Element).shadowRoot as ShadowRoot, declarativeOf(node.shadowRoot));

		setKeepCustomElementRegistryNullOf(
			(copy as Element).shadowRoot as ShadowRoot,
			keepCustomElementRegistryNullOf(node.shadowRoot),
		);

		node.shadowRoot?.childNodes.forEach((child) => {
			cloneANode(child, document, subtree, (copy as Element).shadowRoot as ShadowRoot, shadowRootRegistry);
		});
	}

	return copy;
};

export default cloneANode;
