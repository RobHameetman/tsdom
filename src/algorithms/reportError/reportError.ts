import reportAnException from '#algorithms/reportAnException';

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#dom-reporterror
 *
 * @param e - The error to report.
 */
export const reportError = (e: unknown) => {
	reportAnException(e, globalThis);
};

export default reportError;
