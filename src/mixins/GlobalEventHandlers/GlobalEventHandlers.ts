import { isFunction, isObject, isUndefined } from '@com.robhameetman/utils';

type ListenerMap = Map<string, EventListenerOrEventListenerObject | null>;

const _listeners = new WeakMap<GlobalEventHandlers, ListenerMap>();

export const GlobalEventHandlers = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		onabort: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('abort') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('abort', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onanimationcancel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('animationcancel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('animationcancel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onanimationend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('animationend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('animationend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onanimationiteration: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('animationiteration') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('animationiteration', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onanimationstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('animationstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('animationstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onauxclick: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('auxclick') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('auxclick', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onbeforeinput: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('beforeinput') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('beforeinput', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onbeforematch: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('beforematch') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('beforematch', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onbeforetoggle: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('beforetoggle') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('beforetoggle', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onblur: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('blur') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('blur', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncancel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('cancel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('cancel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncanplay: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('canplay') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('canplay', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncanplaythrough: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('canplaythrough') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('canplaythrough', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onchange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('change') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('change', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onclick: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('click') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('click', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onclose: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('close') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('close', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncontextlost: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('contextlost') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('contextlost', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncontextmenu: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('contextmenu') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('contextmenu', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncontextrestored: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('contextrestored') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('contextrestored', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncopy: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('copy') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('copy', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncuechange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('cuechange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('cuechange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oncut: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('cut') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('cut', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondblclick: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dblclick') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dblclick', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondrag: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('drag') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('drag', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondragend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dragend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dragend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondragenter: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dragenter') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dragenter', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondragleave: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dragleave') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dragleave', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondragover: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dragover') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dragover', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondragstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('dragstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('dragstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondrop: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('drop') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('drop', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ondurationchange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('durationchange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('durationchange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onemptied: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('emptied') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('emptied', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onended: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('ended') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('ended', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onerror: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('error') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('error', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onfocus: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('focus') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('focus', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onformdata: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('formdata') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('formdata', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ongotpointercapture: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('gotpointercapture') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('gotpointercapture', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oninput: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('input') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('input', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		oninvalid: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('invalid') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('invalid', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onkeydown: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('keydown') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('keydown', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onkeypress: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('keypress') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('keypress', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onkeyup: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('keyup') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('keyup', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onload: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('load') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('load', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onloadeddata: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('loadeddata') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('loadeddata', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onloadedmetadata: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('loadedmetadata') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('loadedmetadata', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onloadstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('loadstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('loadstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onlostpointercapture: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('lostpointercapture') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('lostpointercapture', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmousedown: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mousedown') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mousedown', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmouseenter: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mouseenter') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mouseenter', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmouseleave: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mouseleave') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mouseleave', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmousemove: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mousemove') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mousemove', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmouseout: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mouseout') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mouseout', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmouseover: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mouseover') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mouseover', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onmouseup: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('mouseup') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('mouseup', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpaste: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('paste') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('paste', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpause: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pause') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pause', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onplay: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('play') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('play', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onplaying: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('playing') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('playing', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointercancel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointercancel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointercancel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerdown: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerdown') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerdown', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerenter: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerenter') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerenter', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerleave: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerleave') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerleave', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointermove: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointermove') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointermove', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerout: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerout') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerout', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerover: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerover') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerover', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerrawupdate: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerrawupdate') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerrawupdate', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onpointerup: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('pointerup') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('pointerup', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onprogress: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('progress') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('progress', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onratechange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('ratechange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('ratechange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onreset: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('reset') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('reset', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onresize: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('resize') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('resize', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onscroll: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('scroll') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('scroll', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onscrollend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('scrollend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('scrollend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onsecuritypolicyviolation: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('securitypolicyviolation') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('securitypolicyviolation', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onseeked: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('seeked') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('seeked', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onseeking: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('seeking') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('seeking', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onselect: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('select') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('select', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onselectionchange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('selectionchange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('selectionchange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onselectstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('selectstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('selectstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onslotchange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('slotchange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('slotchange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onstalled: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('stalled') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('stalled', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onsubmit: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('submit') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('submit', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onsuspend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('suspend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('suspend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontimeupdate: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('timeupdate') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('timeupdate', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontoggle: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('toggle') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('toggle', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontouchcancel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('touchcancel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('touchcancel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontouchend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('touchend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('touchend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontouchmove: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('touchmove') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('touchmove', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontouchstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('touchstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('touchstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontransitioncancel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('transitioncancel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('transitioncancel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontransitionend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('transitionend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('transitionend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontransitionrun: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('transitionrun') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('transitionrun', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		ontransitionstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('transitionstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('transitionstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onvolumechange: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('volumechange') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('volumechange', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwaiting: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('waiting') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('waiting', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwheel: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('wheel') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('wheel', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwebkitanimationend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('webkitanimationend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('webkitanimationend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwebkitanimationiteration: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('webkitanimationiteration') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('webkitanimationiteration', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwebkitanimationstart: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('webkitanimationstart') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('webkitanimationstart', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
		onwebkittransitionend: {
			get(this: GlobalEventHandlers) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					return listeners.get('webkittransitionend') || null;
				}

				return null;
			},
			set(this: GlobalEventHandlers, value: EventListenerOrEventListenerObject | null) {
				if (_listeners.has(this)) {
					const listeners = _listeners.get(this) as ListenerMap;

					listeners.set('webkittransitionend', value);
				}
			},
			configurable: true,
			enumerable: true,
		},
	}) as T & GlobalEventHandlers;

/**
 * Checks that an `unknown` value is an {@link EventTarget} node.
 *
 * Requirements:
 *   - `value` must be an instance of `EventTarget` if `window` is defined or an object if `window` is `undefined`.
 *   - `value.addEventListener()` must be a function if `window` is `undefined`.
 *   - `value.dispatchEvent()` must be a function if `window` is `undefined`.
 *   - `value.removeEventListener()` must be a function if `window` is `undefined`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link EventTarget} node.
 */
export const hasGlobalEventHandlers = (value: unknown): value is EventTarget =>
	/**
	 * value
	 */
	!isUndefined(window)
		? value instanceof EventTarget
		: isObject(value) &&
		  /**
		   * value.addEventListener()
		   */
		  'addEventListener' in value &&
		  isFunction(value.addEventListener) &&
		  /**
		   * value.dispatchEvent()
		   */
		  'dispatchEvent' in value &&
		  isFunction(value.dispatchEvent) &&
		  /**
		   * value.removeEventListener()
		   */
		  'removeEventListener' in value &&
		  isFunction(value.removeEventListener);

export default GlobalEventHandlers;
