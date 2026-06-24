import isObject from '#_internals/utils/functions/isObject';
import isString from '#_internals/utils/functions/isString';

/**
 * Creates an implementation of the {@link ARIAMixin} interface.
 *
 * @param overrides - Properties to override the default `null` values.
 *
 * @returns An object which implements the {@link ARIAMixin} interface.
 * Property values are `null` by default and can be overridden by providing
 * `overrides`.
 */
export const ARIAMixin = <T extends Element = Element>(
	prototype: T,
) => {
	return Object.defineProperties(prototype, {
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaActiveDescendantElement
		 */
		ariaActiveDescendantElement: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-activedescendant');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-activedescendant', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaAtomic
		 */
		ariaAtomic: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-atomic');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-atomic', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaAutoComplete
		 */
		ariaAutoComplete: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-autocomplete');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-autocomplete', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleLabel
		 */
		ariaBrailleLabel: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-braille-label');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-braille-label', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleRoleDescription
		 */
		ariaBrailleRoleDescription: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-braille-role-description');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-braille-role-description', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaBusy
		 */
		ariaBusy: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-busy');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-busy', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaChecked
		 */
		ariaChecked: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-checked');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-checked', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaColCount
		 */
		ariaColCount: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-colcount');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-colcount', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaColIndex
		 */
		ariaColIndex: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-colindex');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-colindex', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaColIndexText
		 */
		ariaColIndexText: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-colindextext');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-colindextext', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaColSpan
		 */
		ariaColSpan: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-colspan');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-colspan', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaControlsElements
		 */
		ariaControlsElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-controls');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-controls', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaCurrent
		 */
		ariaCurrent: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-current');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-current', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaDescribedByElements
		 */
		ariaDescribedByElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-describedby');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-describedby', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaDescription
		 */
		ariaDescription: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-description');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-description', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaDetailsElements
		 */
		ariaDetailsElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-details');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-details', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaDisabled
		 */
		ariaDisabled: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-disabled');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-disabled', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaErrorMessageElements
		 */
		ariaErrorMessageElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-errormessage');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-errormessage', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaExpanded
		 */
		ariaExpanded: {
				get(this: T & ARIAMixin) {
					return this.getAttribute('aria-expanded');
				},
				set(this: T & ARIAMixin, value: string) {
					this.setAttribute('aria-expanded', value);
				},
				configurable: true,
				enumerable: true,
			},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaFlowToElements
		 */
		ariaFlowToElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-flowto');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-flowto', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaHasPopup
		 */
		ariaHasPopup: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-haspopup');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-haspopup', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaHidden
		 */
		ariaHidden: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-hidden');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-hidden', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaInvalid
		 */
		ariaInvalid: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-invalid');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-invalid', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaKeyShortcuts
		 */
		ariaKeyShortcuts: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-keyshortcuts');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-keyshortcuts', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaLabel
		 */
		ariaLabel: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-label');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-label', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaLabelledByElements
		 */
		ariaLabelledByElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-labelledby');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-labelledby', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaLevel
		 */
		ariaLevel: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-level');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-level', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaLive
		 */
		ariaLive: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('role');
			},
			set(this: T & ARIAMixin, value) {
				this.setAttribute('role', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaModal
		 */
		ariaModal: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-modal');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-modal', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaMultiLine
		 */
		ariaMultiLine: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-multiline');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-multiline', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaMultiSelectable
		 */
		ariaMultiSelectable: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-multiselectable');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-multiselectable', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaOrientation
		 */
		ariaOrientation: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-orientation');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-orientation', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaOwnsElements
		 */
		ariaOwnsElements: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-owns');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-owns', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaPlaceholder
		 */
		ariaPlaceholder: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-placeholder');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-placeholder', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaPosInSet
		 */
		ariaPosInSet: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-posinset');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-posinset', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaPressed
		 */
		ariaPressed: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-pressed');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-pressed', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaReadOnly
		 */
		ariaReadOnly: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-readonly');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-readonly', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRelevant
		 */
		ariaRelevant: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-relevant');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-relevant', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRequired
		 */
		ariaRequired: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-required');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-required', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRoleDescription
		 */
		ariaRoleDescription: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-roledescription');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-roledescription', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRowCount
		 */
		ariaRowCount: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-rowcount');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-rowcount', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndex
		 */
		ariaRowIndex: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-rowindex');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-rowindex', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndexText
		 */
		ariaRowIndexText: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-rowindextext');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-rowindextext', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaRowSpan
		 */
		ariaRowSpan: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-rowspan');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-rowspan', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaSelected
		 */
		ariaSelected: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-selected');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-selected', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaSetSize
		 */
		ariaSetSize: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-setsize');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-setsize', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaSort
		 */
		ariaSort: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-sort');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-sort', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaValueMax
		 */
		ariaValueMax: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-valuemax');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-valuemax', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaValueMin
		 */
		ariaValueMin: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-valuemin');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-valuemin', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaValueNow
		 */
		ariaValueNow: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-valuenow');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-valuenow', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/ariaValueText
		 */
		ariaValueText: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('aria-valuetext');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('aria-valuetext', value);
			},
			configurable: true,
			enumerable: true,
		},
		/**
		 * @see https://developer.mozilla.org/docs/Web/API/Element/role
		 */
		role: {
			get(this: T & ARIAMixin) {
				return this.getAttribute('role');
			},
			set(this: T & ARIAMixin, value: string) {
				this.setAttribute('role', value);
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & ARIAMixin;
};

export const hasAriaMixin = <T = object>(
	value: unknown,
	isT = isObject<T>,
): value is T & ARIAMixin =>
	/**
	 * value
	 */
	isT(value) &&
	/**
	 * value.role
	 */
	'role' in value &&
	(isString(value.role) || value.role === null);

export default ARIAMixin;
