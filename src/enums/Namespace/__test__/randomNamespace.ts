import { faker } from '@faker-js/faker';
import { NAMESPACES, Namespace } from '../Namespace';

export const randomNamespace = () =>
	faker.helpers.arrayElement(NAMESPACES) as Namespace;
