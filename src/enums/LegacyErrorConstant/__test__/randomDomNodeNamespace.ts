import { faker } from '@faker-js/faker';
import { DOM_NODE_NAMESPACES, DomNodeNamespace } from '../DomNodeNamespace';

export const randomDomNodeNamespace = () =>
	faker.helpers.arrayElement(DOM_NODE_NAMESPACES) as DomNodeNamespace;
