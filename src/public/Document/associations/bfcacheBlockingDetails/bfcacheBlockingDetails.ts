/**
 * @see https://html.spec.whatwg.org/multipage/nav-history-apis.html#nrr-details-reason
 */
export type NotRestoredUserAgentSpecificReason =
	| 'audio-capture'
	| 'background-work'
	| 'broadcastchannel-message'
	| 'idbversionchangeevent'
	| 'idledetector'
	| 'keyboardlock'
	| 'mediastream'
	| 'midi'
	| 'modals'
	| 'navigating'
	| 'navigation-check'
	| 'non-trivial-browsing-context-group'
	| 'otpcredential'
	| 'outstanding-network-request'
	| 'paymentrequest'
	| 'pictureinpicturewindow'
	| 'plugins'
	| 'request-method-not-get'
	| 'response-auth-required'
	| 'response-cache-control-no-store'
	| 'response-cache-control-no-cache'
	| 'response-keep-alive'
	| 'response-scheme-not-http-or-https'
	| 'response-status-not-ok'
	| 'rtc'
	| 'rtc-used-with-cache-control-no-store'
	| 'sensors'
	| 'serviceworker-added'
	| 'serviceworker-claimed'
	| 'serviceworker-postmessage'
	| 'serviceworker-version-activated'
	| 'serviceworker-unregistered'
	| 'sharedworker'
	| 'smartcardconnection'
	| 'speechrecognition'
	| 'storageaccess'
	| 'unload-listener'
	| 'video-capture'
	| 'webhid'
	| 'webshare'
	| 'websocket-used-with-cache-control-no-store'
	| 'webtransport'
	| 'webtransport-used-with-cache-control-no-store'
	| 'webxrdevice';

/**
 * @see https://html.spec.whatwg.org/multipage/nav-history-apis.html#nrr-details-reason
 */
export type NotRestoredReason =
	| 'fetch'
	| 'lock'
	| 'masked'
	| 'navigation-failure'
	| 'parser-aborted'
	| 'websocket'
	| NotRestoredUserAgentSpecificReason;

/**
 * @see https://html.spec.whatwg.org/multipage/nav-history-apis.html#nrr-details-struct
 */
export interface NotRestoredReasonDetails {
	readonly reason: NotRestoredReason;
}

/**
 * @see https://html.spec.whatwg.org/multipage/dom.html#concept-document-bfcache-blocking-details
 */
const bfcacheBlockingDetails = new WeakMap<Document, Set<NotRestoredReasonDetails>>();

export const disposeBfcacheBlockingDetailsOf = (document: Document) => {
	bfcacheBlockingDetails.delete(document);
};

export const initializeBfcacheBlockingDetailsOf = (document: Document) => {
	if (!bfcacheBlockingDetails.has(document)) {
		bfcacheBlockingDetails.set(document, new Set());
	}
};

export const bfcacheBlockingDetailsOf = (document: Document) => {
	return bfcacheBlockingDetails.get(document) || new Set();
};

export const setBfcacheBlockingDetailsOf = (document: Document, value: Set<NotRestoredReasonDetails>) => {
	bfcacheBlockingDetails.set(document, value);
};
