import { Namespace } from '../Namespace';

export const fakeNamespace = (key = 'Default') =>
	Namespace[key as keyof typeof Namespace] ||
	Namespace.Default;
