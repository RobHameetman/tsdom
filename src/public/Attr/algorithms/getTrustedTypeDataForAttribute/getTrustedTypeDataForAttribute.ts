import Namespace from '#enums/Namespace';

export type TrustedTypeData = [typeof Element, string | null, string, TrustedType, string];

/**
 * @see https://dom.spec.whatwg.org/#set-an-existing-attribute-value
 */
export const getTrustedTypeDataForAttribute = (element: Element, attribute: string, attributeNs = null as string | null) => {
	let data = null as TrustedTypeData | null;

	if (attributeNs === null) {
		/**
		 * « HTML namespace, SVG namespace, MathML namespace » contains element’s
		 * namespace, and attribute is the name of an event handler content
		 * attribute
		 */

		return [Element, null, attribute, TrustedScript, `Element ${attribute}`];
	}

	data = ([
		[HTMLIFrameElement, null, 'srcdoc', TrustedHTML, 'HTMLIFrameElement srcdoc'],
		[HTMLScriptElement, null, 'src', TrustedScriptURL, 'HTMLScriptElement src'],
		[SVGScriptElement, null, 'href', TrustedScriptURL, 'SVGScriptElement href'],
		[SVGScriptElement, Namespace.Xlink, 'href', TrustedScriptURL, 'SVGScriptElement href'],
		[SVGScriptElement, Namespace.Xlink, 'href', TrustedScriptURL, 'SVGScriptElement href'],
	].find(([firstColumn, secondColumn, thirdColumn]) => {
		return element.constructor.name === firstColumn.name && attributeNs === secondColumn && attribute === thirdColumn;
	})) as TrustedTypeData || null;

	return data;
};

export default getTrustedTypeDataForAttribute;
