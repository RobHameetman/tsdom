export const HTMLHyperlinkElementUtils = <E extends HTMLElement = HTMLElement>(prototype: E) =>
	Object.defineProperties(prototype, {
		hash: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const href = this.href;

				if (!href.includes('#')) {
					return '';
				}

				return href.substring(href.indexOf('#') + 1);
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.hash = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		host: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { host } = new URL(this.href);

				return host;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.host = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		hostname: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { hostname } = new URL(this.href);

				return hostname;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.hostname = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		href: {
			get(this: E & HTMLHyperlinkElementUtils) {
				return this.getAttribute('href') || '';
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				this.setAttributeNS(null, 'href', value);
			},
			configurable: true,
			enumerable: true,
		},
		origin: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { origin } = new URL(this.href);

				return origin;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);

				this.href = this.href.replace(url.origin, value);
			},
			configurable: true,
			enumerable: true,
		},
		password: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { password } = new URL(this.href);

				return password;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.password = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		pathname: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { pathname } = new URL(this.href);

				return pathname;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.pathname = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		port: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { port } = new URL(this.href);

				return port;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.port = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		protocol: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { protocol } = new URL(this.href);

				return protocol;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.protocol = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		search: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { search } = new URL(this.href);

				return search;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.search = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		username: {
			get(this: E & HTMLHyperlinkElementUtils) {
				const { username } = new URL(this.href);

				return username;
			},
			set(this: E & HTMLHyperlinkElementUtils, value: string) {
				const url = new URL(this.href);
				url.username = value;

				this.href = url.toString();
			},
			configurable: true,
			enumerable: true,
		},
		toString: {
			value(this: E & HTMLHyperlinkElementUtils) {
				return this.href;
			},
			configurable: true,
			enumerable: false,
		},
	}) as E & HTMLHyperlinkElementUtils;

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const hasHTMLHyperlinkElementUtils = (value: unknown): value is Element =>
	value instanceof Element;

export default HTMLHyperlinkElementUtils;
