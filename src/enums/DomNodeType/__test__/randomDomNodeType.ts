import { faker } from '@faker-js/faker';
import { type DomNodeTypes, DOM_NODE_TYPES } from '../DomNodeType';

const deprecatedTypes = [
	'ENTITY_NODE',
	'ENTITY_REFERENCE_NODE',
	'NOTATION_NODE',
];

export const randomDomNodeType = ({
	includeDeprecated = false,
}: Record<string, unknown> = {}) =>
	faker.helpers.arrayElement(
		DOM_NODE_TYPES.filter((type) =>
			includeDeprecated ? true : !deprecatedTypes.includes(type),
		),
	) as DomNodeTypes;
