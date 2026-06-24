import Namespace from '#enums/Namespace';
import InvalidCharacterError from '#errors/InvalidCharacterError';
import NotSupportedError from '#errors/NotSupportedError';
// import implOf from '#_internals/impl';
import DomNodeType from '#enums/DomNodeType';
import Node from '#public/Node';
import NonElementParentNode from '#mixins/NonElementParentNode';
import ParentNode from '#mixins/ParentNode';
import GlobalEventHandlers from '#mixins/GlobalEventHandlers';
import DocumentOrShadowRoot from '#mixins/DocumentOrShadowRoot';
import XPathEvaluatorBase from '#mixins/XPathEvaluatorBase';
import FontFaceSource from '#mixins/FontFaceSource';
import { setGetTheParentOf } from '#public/EventTarget/associations/getTheParent';
import validateAndExtract from '#algorithms/validateAndExtract';
import validAttributeLocalName from '#public/Attr/algorithms/validAttributeLocalName';
import { initializeLocalNameOf, initializeNamespaceOf, initializeNamespacePrefixOf } from '#public/Attr/associations';
import { disposeContentTypeOf } from '#public/Document/associations/contentType';
import { disposeEncodingOf } from '#public/Document/associations/encoding';
import { disposeModeOf, modeOf } from '#public/Document/associations/mode';
import { disposeOriginOf, initializeOriginOf } from '#public/Document/associations/origin';
import { disposeTypeOf, isAnHTMLDocument } from '#public/Document/associations/type';
import { disposeUrlOf, initializeUrlOf } from '#public/Document/associations/url';
import { disposeAllowDeclarativeShadowRootsOf } from '#public/Document/associations/allowDeclarativeShadowRoots';
import { disposeCustomElementRegistryOf } from '#public/Document/associations/customElementRegistry';
import { initializeNodeDocumentOf } from '#public/Node/associations';
import { setEndOf, setStartOf } from '#public/AbstractRange/boundaries';
import { initializeRootOf as setRootOfIterator, setFilterOf as setFilterOfIterator, setPointerBeforeReferenceFor, setReferenceOf, setWhatToShowOf as setWhatToShowOfIterator } from '#public/NodeIterator/associations';
import { initializeRootOf as setRootOfTreeWalker, setCurrentOf, setFilterOf as setFilterOfTreeWalker, setWhatToShowOf as setWhatToShowOfTreeWalker } from '#public/TreeWalker/associations';
import { createAnEvent } from '#public/Event/algorithms';
import { initializeTimeStampOf, initializeTypeOf, setIsTrustedToFalseFor } from '#public/Event/attributes';
import EventFlag, { unsetFlagsOf } from '#public/Event/associations/flags';

const withMixins = (prototype: Document) =>
	DocumentOrShadowRoot(
		FontFaceSource(
			GlobalEventHandlers(
				NonElementParentNode(
					ParentNode(
						XPathEvaluatorBase(
							prototype,
						),
					),
				),
			),
		),
	);

export const Document = function(this: Document) {
	// encoding.set(this, { name: 'UTF-8', labels: [] });
	// contentType.set(this, 'application/xml');
	// initializeUrlOf(this);
	initializeOriginOf(this);
	// mode.set(this, 'no-quirks');
	// allowDeclarativeShadowRoots.set(this, false);
	// customElementRegistry.set(this, null);

	setGetTheParentOf(this, (event: Event) => {
		if (event.type === 'load' || doesNotHaveBrowsingContext(this)) {
			return null;
		}

		return globalThis;
	});
} as unknown as typeof global.Document;

// export const Document = implOf<typeof global.Document>(
// 	function Document(this: Document) {
// 		// /* @ts-expect-error - Expected 1 arguments, but got 3. */
// 		// Node.call(this, DomNodeType.DOCUMENT_NODE, NODE_CONSTRUCTOR_KEY);

// 		DocumentOrShadowRoot.call(this);
// 		FontFaceSource.call(this);
// 		GlobalEventHandlers.call(this);
// 		NonElementParentNode.call(this);
// 		ParentNode.call(this);
// 		XPathEvaluatorBase.call(this);

// 		encoding.set(this, { name: 'UTF-8', labels: [] });
// 		contentType.set(this, 'application/xml');
// 		url.set(this, new URL('about:blank'));
// 		origin.set(this, 'null');
// 		mode.set(this, 'no-quirks');
// 		allowDeclarativeShadowRoots.set(this, false);
// 		customElementRegistry.set(this, null);

// 		setGetTheParentOf(this, (event: Event) => {
// 			if (event.type === 'load' || doesNotHaveBrowsingContext(this)) {
// 				return null;
// 			}

// 			return globalThis;
// 		});

// 		return this;
// 	},
// );

Object.defineProperties(Document, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Node.prototype, {
			/**
			 * The **`URL`** read-only property of the Document interface returns the
			 * document location as a string.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/URL
			 */
			URL: {
				get(this: Document) {
					return url.get(this)?.toString() || '';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * Returns or sets the color of an active link in the document body.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/alinkColor
			 */
			alinkColor: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The {@link Document} interface's read-only **`all`** property returns an
			 * {@link HTMLAllCollection} rooted at the document node.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/all
			 */
			all: {
				get(this: Document) {
					return [] as unknown as HTMLCollectionOf<Element>;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The **`anchors`** read-only property of an {@link HTMLCollection}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/anchors
			 */
			anchors: {
				get(this: Document) {
					return this.getElementsByTagName('a');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The **`applets`** property of the {@link Document} returns an empty
			 * {@link HTMLCollection}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/applets
			 */
			applets: {
				get(this: Document) {
					return this.getElementsByTagName('applet');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The deprecated `bgColor` property gets or sets the background color of
			 * the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/bgColor
			 */
			bgColor: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.body`** property represents the body element of the
			 * document or `null` if no such element exists.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/body
			 */
			body: {
				get(this: Document) {
					return this.getElementsByTagName('body')[0] || null;
				},
				set(this: Document, _value: HTMLElement | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.characterSet`** read-only property returns the character
			 * encoding of the document that it's currently rendered with.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/characterSet
			 */
			characterSet: {
				get(this: Document) {
					return encoding.get(this)?.name || 'UTF-8';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * This is a legacy alias of {@link Document['characterSet']}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/characterSet
			 */
			charset: {
				get(this: Document) {
					return this.characterSet;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.compatMode`** read-only property indicates whether the
			 * document is rendered in Quirks mode or Standards mode.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/compatMode
			 */
			compatMode: {
				get(this: Document) {
					return mode.get(this) === 'no-quirks' ? 'CSS1Compat' : 'BackCompat';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.contentType`** read-only property returns the MIME type
			 * that the document is being rendered as.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/contentType
			 */
			contentType: {
				get(this: Document) {
					return contentType.get(this) || 'application/xml';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The Document property `cookie` lets you read and write cookies associated
			 * with the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/cookie
			 */
			cookie: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.currentScript`** property returns the script element
			 * whose script is currently being processed and isn't a JavaScript module.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/currentScript
			 */
			currentScript: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * In browsers, **`document.defaultView`** returns the `window` object. This
			 * property is read-only.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/defaultView
			 */
			defaultView: {
				get(this: Document) {
					return globalThis as Document['defaultView'];
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * **`document.designMode`** controls whether the entire document is
			 * editable.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/designMode
			 */
			designMode: {
				get(this: Document) {
					return 'off';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.dir`** property is a string representing the
			 * directionality of the text of the document, whether left to right
			 * (default) or right to left.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/dir
			 */
			dir: {
				get(this: Document) {
					return 'ltr';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`doctype`** read-only property of the {@link Document} interface is
			 * a {@link DocumentType} object representing the {@link Doctype} associated
			 * with the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/doctype
			 */
			doctype: {
				get(this: Document) {
					for (let i = 0; i < this.childNodes.length; i += 1) {
						const childNode = this.childNodes[i];

						if (childNode.nodeType === DomNodeType.DOCUMENT_TYPE_NODE) {
							return childNode as DocumentType;
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`documentElement`** read-only property of the {@link Document}
			 * interface returns the `<html>` element for HTML documents.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/documentElement
			 */
			documentElement: {
				get(this: Document) {
					for (let i = 0; i < this.childNodes.length; i += 1) {
						const childNode = this.childNodes[i];

						if (childNode.nodeType === DomNodeType.ELEMENT_NODE) {
							return childNode as Element;
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`documentURI`** read-only property of the {@link Document}
			 * interface is a string.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/documentURI
			 */
			documentURI: {
				get(this: Document) {
					return this.URL;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The **`domain`** property of the {@link Document} interface gets/sets the
			 * domain portion of the origin of the current document, as used by the
			 * same-origin policy.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/domain
			 */
			domain: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`embeds`** read-only property of the {@link Document} interface is
			 * an HTMLCollection.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/embeds
			 */
			embeds: {
				get(this: Document) {
					return this.getElementsByTagName('embed');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * **`fgColor`** gets/sets the foreground color, or text color, of the
			 * current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fgColor
			 */
			fgColor: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`forms`** read-only property of the {@link Document} interface
			 * returns an {@link HTMLCollection} listing all the form elements contained
			 * in the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/forms
			 */
			forms: {
				get(this: Document) {
					return this.getElementsByTagName('form');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`fragmentDirective`** read-only property of the {@link Document}
			 * interface returns the {@link FragmentDirective} for the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fragmentDirective
			 */
			fragmentDirective: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The obsolete Document interface's **`fullscreen`** read-only property
			 * reports whether or not the document is currently displaying content in
			 * fullscreen mode.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fullscreen
			 */
			fullscreen: {
				get(this: Document) {
					return false;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`fullscreenEnabled`** property on the {@link Document}
			 * interface indicates whether or not fullscreen mode is available.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fullscreenEnabled
			 */
			fullscreenEnabled: {
				get(this: Document) {
					return false;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`head`** read-only property of the {@link Document} interface
			 * returns the head element of the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/head
			 */
			head: {
				get(this: Document) {
					return this.getElementsByTagName('head')[0] || null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.hidden`** read-only property returns a boolean value
			 * indicating if the page is considered hidden or not.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/hidden
			 */
			hidden: {
				get(this: Document) {
					return false;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`images`** read-only property of the {@link Document} interface
			 * returns a collection of the images in the current HTML document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/images
			 */
			images: {
				get(this: Document) {
					return this.getElementsByTagName('img');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.implementation`** property returns the
			 * {@link DOMImplementation} object associated with the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/implementation
			 */
			implementation: {
				get(this: Document) {
					return this.ownerDocument?.implementation || null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * This is a legacy alias of {@link Document['characterSet']}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/characterSet
			 */
			inputEncoding: {
				get(this: Document) {
					return this.characterSet;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`lastModified`** property of the Document interface returns a string
			 * containing the date and local time on which the current document was last
			 * modified.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/lastModified
			 */
			lastModified: {
				get(this: Document) {
					return new Date().toISOString();
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.linkColor`** property gets/sets the color of links within
			 * the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/linkColor
			 */
			linkColor: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`links`** read-only property of the {@link Document} interface
			 * returns a collection of all area elements and a elements in a document
			 * with a value for the `href` attribute.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/links
			 */
			links: {
				get(this: Document) {
					return this.getElementsByTagName('a');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.location`** read-only property returns a {@link Location}
			 * object and provides methods for changing that URL and loading another URL.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/location
			 */
			location: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: Location) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fullscreenchange_event
			 */
			onfullscreenchange: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/fullscreenerror_event
			 */
			onfullscreenerror: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/pointerlockchange_event
			 */
			onpointerlockchange: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/pointerlockerror_event
			 */
			onpointerlockerror: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/readystatechange_event
			 */
			onreadystatechange: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/docs/Web/API/Document/visibilitychange_event
			 */
			onvisibilitychange: {
				get(this: Document) {
					return null;
				},
				set(this: Document, _value: (this: Document, ev: Event) => any | null) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			ownerDocument: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`pictureInPictureEnabled`** property of the
			 * {@link Document} interface indicates whether or not Picture-in-Picture
			 * mode is available.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/pictureInPictureEnabled
			 */
			pictureInPictureEnabled: {
				get(this: Document) {
					return false;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`plugins`** read-only property of the containing one or more
			 * {@link HTMLEmbedElement} representing the plugins embedded in the current
			 * document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/plugins
			 */
			plugins: {
				get(this: Document) {
					return this.getElementsByTagName('object');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.readyState`** property describes the loading state of the
			 * document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/readyState
			 */
			readyState: {
				get(this: Document) {
					return 'complete';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.referrer`** property returns the URI of the page that
			 * linked to this page.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/referrer
			 */
			referrer: {
				get(this: Document) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @deprecated
			 * **`Document.rootElement`** returns the Element that is the root element
			 * of the document if it is an documents.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/rootElement
			 */
			rootElement: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`scripts`** property of the Document interface returns a list of
			 * the script elements in the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/scripts
			 */
			scripts: {
				get(this: Document) {
					return this.getElementsByTagName('script');
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`scrollingElement`** read-only property of the scrolls the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/scrollingElement
			 */
			scrollingElement: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
			 */
			textContent: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The `timeline` readonly property of the {@link Document} interface
			 * represents the default timeline of the current document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/timeline
			 */
			timeline: {
				get(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`document.title`** property gets or sets the current title of the
			 * document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/title
			 */
			title: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The **`Document.visibilityState`** read-only property returns the
			 * visibility of the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/visibilityState
			 */
			visibilityState: {
				get(this: Document) {
					return 'visible';
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.vlinkColor`** property gets/sets the color of links that
			 * the user has visited in the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/vlinkColor
			 */
			vlinkColor: {
				get(this: Document) {
					return '';
				},
				set(this: Document, _value: string) {
					return;
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * **`Document.adoptNode()`** transfers a node/subtree from another
			 * {@link Document} into the method's document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/adoptNode
			 */
			adoptNode: {
				value<T extends Node>(this: Document, node: T) {
					return node;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 */
			captureEvents: {
				value(this: Document) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`caretPositionFromPoint()`** method of the {@link Document}
			 * interface returns a CaretPosition object, containing the DOM node, along
			 * with the caret and caret's character offset within that node.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/caretPositionFromPoint
			 */
			caretPositionFromPoint: {
				value(this: Document, x: number, y: number) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 */
			caretRangeFromPoint: {
				value(this: Document, x: number, y: number) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.clear()`** method does nothing, but doesn't raise any
			 * error.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/clear
			 */
			clear: {
				value(this: Document) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.close()`** method finishes writing to a document, opened
			 * with {@link Document.open()}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/close
			 */
			close: {
				value(this: Document) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createAttribute()`** method creates a new attribute node,
			 * and returns it.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-document-createattribute
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createAttribute
			 */
			createAttribute: {
				value(this: Document, localName: string) {
					if (!validAttributeLocalName(localName)) {
						throw new InvalidCharacterError(this, 'createAttribute', 'The provided local name is not a valid attribute local name.');
					}

					if (isAnHTMLDocument(this)) {
						localName = localName.toLowerCase();
					}

					const attribute = Object.create(Attr.prototype) as Attr;

					initializeLocalNameOf(attribute, localName);
					initializeNodeDocumentOf(attribute, this);

					return attribute;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createAttributeNS()`** method creates a new attribute
			 * node with the specified namespace URI and qualified name, and returns it.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-document-createattributens
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createAttributeNS
			 */
			createAttributeNS: {
				value(this: Document, namespace: string | null, qualifiedName: string) {
					let prefix: string | null;
					let localName: string;

					[ namespace, prefix, localName ] = validateAndExtract(namespace, qualifiedName, 'attribute');

					const attribute = Node.call(Object.create(Attr.prototype)) as unknown as Attr;

					initializeNamespaceOf(attribute, namespace);
					initializeNamespacePrefixOf(attribute, prefix);
					initializeLocalNameOf(attribute, localName);

					initializeNodeDocumentOf(attribute, this);

					return attribute;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * **`createCDATASection()`** creates a new CDATA section node, and returns
			 * it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createCDATASection
			 */
			createCDATASection: {
				value(this: Document, data: string) {
					const cdata = Object.create(CDATASection.prototype);

					Node.call(cdata);

					$cdata.data = data;

					return $cdata;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * **`createComment()`** creates a new comment node, and returns it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createComment
			 */
			createComment: {
				value(this: Document, data: string) {
					const $comment = Object.create(Comment.prototype) as Comment;

					$comment.data = data;

					return $comment;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * Creates a new empty {@link DocumentFragment} into which DOM nodes can be
			 * added to build an offscreen DOM tree.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createDocumentFragment
			 */
			createDocumentFragment: {
				value(this: Document) {
					const $fragment = Object.create(DocumentFragment.prototype) as DocumentFragment;

					// /* @ts-expect-error - Expected 1 arguments, but got 3. */
					// DocumentFragment.call($fragment, DomNodeType.DOCUMENT_FRAGMENT_NODE, NODE_CONSTRUCTOR_KEY);

				return $fragment;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * In an HTML document, the **`document.createElement()`** method creates
			 * the HTML element specified by `localName` or an {@link HTMLUnknownElement}
			 * if `localName` isn't recognized.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createElement
			 */
			createElement: {
				value<K extends keyof HTMLElementTagNameMap>(this: Document, tagName: K, _options?: ElementCreationOptions) {
					return this.createElementNS(Namespace.Default, tagName);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * Creates an element with the specified namespace URI and qualified name.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createElementNS
			 */
			createElementNS: {
				value(this: Document, namespace: string | null, qualifiedName: string, _options?: string | ElementCreationOptions) {
					let [prefix, localName] = qualifiedName.includes(':')
						? qualifiedName.split(':')
						: [null, qualifiedName];

					const $element = Object.create(Element.prototype) as Element;

					/* @ts-expect-error - Expected 1 arguments, but got 4. */
					Element.call($element, namespace, prefix, localName, _options, ELEMENT_CONSTRUCTOR_KEY);

					return $element;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * Creates an event of the type specified.
			 * NOTE: Event constructors ought to be used instead.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createEvent
			 */
			createEvent: {
				value(this: Document, eventInterface: string) {
					let constructor = null;

					constructor = ({
						'animationevent': AnimationEvent,
						'animationplaybackevent': AnimationPlaybackEvent,
						'audioprocessevent': AudioProcessingEvent,
						'beforeunloadevent': BeforeUnloadEvent,
						'blobevent': BlobEvent,
						'clipboardevent': ClipboardEvent,
						'closeevent': CloseEvent,
						'compositionevent': CompositionEvent,
						'contentvisibilityautostatechangeevent': ContentVisibilityAutoStateChangeEvent,
						'cookiechangeevent': CookieChangeEvent,
						'customevent': CustomEvent,
						'devicemotionevent': DeviceMotionEvent,
						'deviceorientationevent': DeviceOrientationEvent,
						'dragevent': DragEvent,
						'errorevent': ErrorEvent,
						'event': Event,
						'events': Event,
						'focusevent': FocusEvent,
						'fontfacesetloadevent': FontFaceSetLoadEvent,
						'formdataevent': FormDataEvent,
						'gamepadevent': GamepadEvent,
						'hashchangeevent': HashChangeEvent,
						'htmlevents': Event,
						'idbversionchangeevent': IDBVersionChangeEvent,
						'keyboardevent': KeyboardEvent,
						'midiconnectionevent': MIDIConnectionEvent,
						'midimessageevent': MIDIMessageEvent,
						'mediaencryptionevent': MediaEncryptedEvent,
						'mediakeymessageevent': MediaKeyMessageEvent,
						'mediaquerylistevent': MediaQueryListEvent,
						'mediastreamtrackevent': MediaStreamTrackEvent,
						'messageevent': MessageEvent,
						'mouseevent': MouseEvent,
						'mouseevents': MouseEvent,
						'offlineaudiocompletionevent': OfflineAudioCompletionEvent,
						'pagerevealevent': PageRevealEvent,
						'pageswapevent': PageSwapEvent,
						'pagetransitionevent': PageTransitionEvent,
						'paymentmethodchangeevent': PaymentMethodChangeEvent,
						'paymentrequestupdateevent': PaymentRequestUpdateEvent,
						'pictureinpictureevent': PictureInPictureEvent,
						'pointerevent': PointerEvent,
						'popstateevent': PopStateEvent,
						'progressevent': ProgressEvent,
						'promiserejectionevent': PromiseRejectionEvent,
						'rtcdtmftonechangeevent': RTCDTMFToneChangeEvent,
						'rtcdatachannelevent': RTCDataChannelEvent,
						'rtcerrorevent': RTCErrorEvent,
						'rtcpeerconnectioniceerrorevent': RTCPeerConnectionIceErrorEvent,
						'rtcpeerconnectioniceevent': RTCPeerConnectionIceEvent,
						'rtctrackevent': RTCTrackEvent,
						'securitypolicyviolationevent': SecurityPolicyViolationEvent,
						'speechsynthesiserrorevent': SpeechSynthesisErrorEvent,
						'speechsynthesisevent': SpeechSynthesisEvent,
						'storageevents': StorageEvent,
						'storageevent': StorageEvent,
						'submitevent': SubmitEvent,
						'svgevents': Event,
						'textevent': TextEvent,
						'toggleevent': ToggleEvent,
						'touchevent': TouchEvent,
						'trackevent': TrackEvent,
						'transitionevent': TransitionEvent,
						'uievent': UIEvent,
						'uievents': UIEvent,
						'webglcontextevent': WebGLContextEvent,
						'wheelEvent': WheelEvent,
					}[eventInterface.toLocaleLowerCase()] || null);

					if (constructor === null) {
						throw new NotSupportedError(this, 'createEvent', `The event interface '${eventInterface}' is not supported.`);
					}

					if (!(eventInterface in globalThis)) {
						throw new NotSupportedError(this, 'createEvent', `The event interface '${eventInterface}' is not supported.`);
					}

					const event = createAnEvent(constructor as typeof Event);

					initializeTypeOf(event, '');
					initializeTimeStampOf(event, globalThis.performance.now() - globalThis.performance.timeOrigin);

					setIsTrustedToFalseFor(event);
					unsetFlagsOf(event, EventFlag.Initialized);

					return event;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createNodeIterator()`** method returns a new
			 * {@link NodeIterator} object.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createNodeIterator
			 */
			createNodeIterator: {
				value(this: Document, root: Node, whatToShow = NodeFilter.SHOW_ALL, filter = null as NodeFilter | null) {
					const iterator = Object.create(NodeIterator.prototype) as NodeIterator;

					setRootOfIterator(iterator, root);
					setReferenceOf(iterator, root);
					setPointerBeforeReferenceFor(iterator, true);
					setWhatToShowOfIterator(iterator, whatToShow);
					setFilterOfIterator(iterator, filter);

					return iterator;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * `createProcessingInstruction()` generates a new processing instruction
			 * node and returns it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createProcessingInstruction
			 */
			createProcessingInstruction: {
				value(this: Document, target: string, data: string) {
					const $pi = Object.create(ProcessingInstruction.prototype) as ProcessingInstruction;

					$pi.target = target;
					$pi.data = data;

					return $pi;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createRange()`** method returns a new {@link Range}
			 * object and returns it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createRange
			 */
			createRange: {
				value(this: Document) {
					const range = Object.create(Range.prototype) as Range;

					setStartOf(range, [this, 0]);
					setEndOf(range, [this, 0]);

					return range;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createTextNode()`** method creates a new {@link Text}
			 * node and returns it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createTextNode
			 */
			createTextNode: {
				value(this: Document, data: string) {
					const $text = Object.create(Text.prototype) as Text;

					$text.data = data;

					return $text;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.createTreeWalker()`** creator method returns a newly
			 * created {@link TreeWalker} object.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/createTreeWalker
			 */
			createTreeWalker: {
				value(this: Document, root: Node, whatToShow = NodeFilter.SHOW_ALL, filter = null as NodeFilter | null) {
					const walker = Object.create(TreeWalker.prototype) as TreeWalker;

					setRootOfTreeWalker(walker, root);
					setCurrentOf(walker, root);
					setWhatToShowOfTreeWalker(walker, whatToShow);
					setFilterOfTreeWalker(walker, filter);

					return walker;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`execCommand`** method implements multiple different commands.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/execCommand
			 */
			execCommand: {
				value(this: Document, commandId: string, showUI?: boolean, value?: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The {@link Document} method **`exitFullscreen()`** requests that the
			 * element on this document which is currently being presented in fullscreen
			 * mode be taken out of fullscreen mode, restoring the previous state of the
			 * screen.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/exitFullscreen
			 */
			exitFullscreen: {
				value(this: Document) {
					return Promise.resolve();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`exitPictureInPicture()`** method of the {@link Document} interface
			 * requests that a video contained in this document, which is currently
			 * floating, be taken out of picture-in-picture mode, restoring the previous
			 * state of the screen.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/exitPictureInPicture
			 */
			exitPictureInPicture: {
				value(this: Document) {
					return Promise.resolve();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`exitPointerLock()`** method of the {@link Document} interface
			 * asynchronously releases a pointer lock previously requested through
			 * {@link Element.requestPointerLock()}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/exitPointerLock
			 */
			exitPointerLock: {
				value(this: Document) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getElementById()`** method of the {@link Document} interface
			 * returns an {@link Element} object representing the element whose `id`
			 * property matches the specified string. Since element IDs are required to
			 * be unique if specified, they're a useful way to get access to a specific
			 * element quickly.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getElementById
			 */
			getElementById: {
				value(this: Document, elementId: string) {
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getElementsByClassName`** method of of all child elements which
			 * have all of the given class name(s).
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getElementsByClassName
			 */
			getElementsByClassName: {
				value(this: Document, classNames: string) {
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getElementsByName()`** method of the {@link Document} object
			 * returns a {@link NodeList} collection of elements with a given `name`
			 * attribute in the document.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getElementsByName
			 */
			getElementsByName: {
				value(this: Document, elementName: string) {
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getElementsByTagName`** method of the {@link Document} interface
			 * returns a live {@link HTMLCollection} of elements with the given tag
			 * name in the order in which they are encountered in a preorder traversal
			 * of the document tree. The complete document is searched, including the
			 * root node.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getElementsByTagName
			 */
			getElementsByTagName: {
				value(this: Document, qualifiedName: string) {
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getElementsByTagNameNS()`** method of the {@link Document}
			 * interface returns a list of elements with the given tag name belonging to
			 * the given namespace.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getElementsByTagNameNS
			 */
			getElementsByTagNameNS: {
				value(this: Document, namespace: string | null, localName: string) {
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`getSelection()`** method of the {@link Document} interface returns
			 * the {@link Selection} object associated with this document, representing
			 * the range of text selected by the user, or the current position of the
			 * caret.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/getSelection
			 */
			getSelection: {
				value(this: Document) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`hasFocus()`** method of the {@link Document} interface returns a
			 * boolean value indicating whether the document or any element inside the
			 * document has focus.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/hasFocus
			 */
			hasFocus: {
				value(this: Document) {
					return true;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`hasStorageAccess()`** method of the {@link Document} interface
			 * returns a Promise that resolves with a boolean value indicating whether
			 * the document has access to third-party, unpartitioned cookies.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/hasStorageAccess
			 */
			hasStorageAccess: {
				value(this: Document) {
					return Promise.resolve(true);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The Document object's **`importNode()`** method creates a copy of a node
			 * and inserts it into the current document later.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/importNode
			 */
			importNode: {
				value(this: Document, importedNode: Node, deep: boolean = false) {
					const $importedNode = Object.create(Object.getPrototypeOf(importedNode)) as Node;

					/* @ts-expect-error - Expected 1 arguments, but got 3. */
					Node.call($importedNode, importedNode.nodeType, NODE_CONSTRUCTOR_KEY);

					return $importedNode;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`Document.open()`** method opens a document for writing. This does
			 * come with some side effects.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/open
			 */
			open: {
				value(this: Document, url?: string, name?: string, features?: string, replace?: boolean) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.queryCommandEnabled()`** method reports whether or not
			 * the specified editor command is enabled by the browser.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/queryCommandEnabled
			 */
			queryCommandEnabled: {
				value(this: Document, commandId: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`queryCommandState()`** method will tell you if the current
			 * selection has a certain {@link Document.execCommand()} command applied.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/queryCommandState
			 */
			queryCommandState: {
				value(this: Document, commandId: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.queryCommandSupported()`** method reports whether or not
			 * the specified editor command is supported by the browser.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/queryCommandSupported
			 */
			queryCommandSupported: {
				value(this: Document, commandId: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.queryCommandValue()`** method returns the current
			 * value of the given command on the current selection.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/queryCommandValue
			 */
			queryCommandValue: {
				value(this: Document, commandId: string) {
					return '';
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`Document.releaseEvents()`** method does nothing, but doesn't
			 * raise any error.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/releaseEvents
			 */
			releaseEvents: {
				value(this: Document) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`requestStorageAccess()`** method of the {@link Document} interface
			 * allows content loaded in a third-party context (i.e., embedded in an
			 * iframe) to request access to third-party cookies and unpartitioned state.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/requestStorageAccess
			 */
			requestStorageAccess: {
				value(this: Document) {
					return Promise.resolve();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`startViewTransition()`** method of the {@link Document} interface
			 * starts a new same-document (SPA) view transition and returns a
			 * {@link ViewTransition} object to represent it.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/startViewTransition
			 */
			startViewTransition: {
				value(this: Document, callback: () => void) {
					callback();

					return {
						finished: Promise.resolve(),
					};
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * @deprecated
			 * The **`write()`** method of the {@link Document} interface writes text in
			 * one or more TrustedHTML or string parameters to a document stream opened
			 * by {@link document.open()}.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/write
			 */
			write: {
				value(this: Document, ...text: Array<string>) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`writeln()`** method of the {@link Document} interface writes text
			 * in one or more {@link TrustedHTML} or string parameters to a document
			 * stream opened by {@link document.open()}, followed by a newline
			 * character.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Document/writeln
			 */
			writeln: {
				value(this: Document, ...text: Array<string>) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			constructor: {
				value: Document,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: Document) {
					disposeCustomElementRegistryOf(this); // is this necessary?

					disposeAllowDeclarativeShadowRootsOf(this);
					disposeContentTypeOf(this);
					disposeEncodingOf(this);
					disposeModeOf(this);
					disposeOriginOf(this);
					disposeTypeOf(this);
					disposeUrlOf(this);

					if (Symbol.dispose in Node.prototype) {
						(Node.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: Document) {
					disposeCustomElementRegistryOf(this); // is this necessary?

					disposeAllowDeclarativeShadowRootsOf(this);
					disposeContentTypeOf(this);
					disposeEncodingOf(this);
					disposeModeOf(this);
					disposeOriginOf(this);
					disposeTypeOf(this);
					disposeUrlOf(this);

					if (Symbol.asyncDispose in Node.prototype) {
						await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Document',
				configurable: true,
			},
		}))),
	},
});

Object.seal(Document);

if (!globalThis.Document) {
	globalThis.Document = Document;
}

/**
 * Checks that an `unknown` value is a {@link Document}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Document} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Document}.
 */
export const isDocument = (value: unknown): value is Document =>
	typeof globalThis.Document !== 'undefined' &&
	value instanceof globalThis.Document;

export default Document;
