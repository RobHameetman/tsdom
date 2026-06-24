import validCustomElementName from '#algorithms/validCustomElementName';
import validShadowHostName from '#algorithms/validShadowHostName';
import Namespace from '#enums/Namespace';
import { NotSupportedError } from '#errors/NotSupportedError';
import lookUpACustomElementDefinition from '#public/CustomElementRegistry/algorithms/lookUpACustomElementDefinition';
import { customElementStateOf } from '#public/Element/associations/customElementState';
import { setShadowRootOf } from '#public/Element/associations/shadowRoot';
import { isValueOf } from '#public/Element/associations/isValue';
import { setAvailableToElementInternalsOf } from '#public/ShadowRoot/associations/availableToElementInternals';
import { setClonableOf } from '#public/ShadowRoot/associations/clonable';
import { setCustomElementRegistryOf } from '#public/ShadowRoot/associations/customElementRegistry';
import { declarativeOf, setDeclarativeOf } from '#public/ShadowRoot/associations/declarative';
import { initializeNodeDocumentOf } from '#public/Node/associations/nodeDocument';
import { initializeModeOf } from '#public/ShadowRoot/associations/mode';
import { setDelegatesFocusOf } from '#public/ShadowRoot/associations/delegatesFocus';
import { setSerializableOf } from '#public/ShadowRoot/associations/serializable';
import { setSlotAssignmentOf } from '#public/ShadowRoot/associations/slotAssignment';
import { isShadowHost } from '#tree/ShadowTree/relationships/shadowRoots';
import { attach } from '#tree/Tree/relationships/hosts';

/**
 * @see https://dom.spec.whatwg.org/#concept-attach-a-shadow-root
 */
export const attachAShadowRoot = (
	element: Element,
	mode: string,
	clonable: boolean,
	serializable: boolean,
	delegatesFocus: boolean,
	slotAssignment: string,
	registry: CustomElementRegistry | null,
) => {
	if (element.namespaceURI !== Namespace.Html) {
		throw new NotSupportedError({}, 'attach', 'Shadow DOM is only supported on elements in the HTML namespace.');
	}

	if (!validShadowHostName(element.localName)) {
		throw new NotSupportedError({}, 'attach', 'Shadow DOM is only supported on elements with valid custom element names.');
	}

	if (validCustomElementName(element.localName) || isValueOf(element) !== null) {
		const definition = lookUpACustomElementDefinition(registry, element.namespaceURI, element.localName, isValueOf(element));

		if (definition?.disableShadow) {
			throw new NotSupportedError({}, 'attach', 'Shadow DOM is disabled for this custom element.');
		}
	}

	if (isShadowHost(element)) {
		const currentShadowRoot = element.shadowRoot as ShadowRoot;

		if (!declarativeOf(currentShadowRoot) && currentShadowRoot.mode !== mode) {
			throw new NotSupportedError({}, 'attach', 'The element already has an open shadow root.');
		} else {
			currentShadowRoot.childNodes.forEach((child) => child.remove());

			setDeclarativeOf(currentShadowRoot, false);

			return;
		}
	}

	let shadow = Object.create(ShadowRoot.prototype) as ShadowRoot;

	initializeNodeDocumentOf(shadow, element.ownerDocument);
	initializeModeOf(shadow, mode as ShadowRootMode);

	attach(shadow, element);

	setDelegatesFocusOf(shadow, delegatesFocus);

	if (['precustomized', 'custom'].includes(customElementStateOf(element))) {
		setAvailableToElementInternalsOf(shadow, true);
	}

	setSlotAssignmentOf(shadow, slotAssignment as SlotAssignmentMode);
	setDeclarativeOf(shadow, false);
	setClonableOf(shadow, clonable);
	setSerializableOf(shadow, serializable);
	setCustomElementRegistryOf(shadow, registry);

	setShadowRootOf(element, shadow);
};

export default attachAShadowRoot;
