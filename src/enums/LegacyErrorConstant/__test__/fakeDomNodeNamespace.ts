import { DomNodeNamespace } from '../DomNodeNamespace';

export const fakeDomNodeNamespace = (key = 'DEFAULT') =>
	DomNodeNamespace[key as keyof typeof DomNodeNamespace] ||
	DomNodeNamespace.DEFAULT;
