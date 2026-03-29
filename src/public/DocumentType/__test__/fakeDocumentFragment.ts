import DomNodeType from '@/nodes/enums/DomNodeType';
import { fakeNode } from '../../Node/__test__';

export const fakeDocumentFragment = ({
	ssr = typeof window === 'undefined',
	...overrideProps
}: Record<string, unknown> = {}) => {
	const documentFragment = fakeNode({
		childElementCount: 0,
		children: [],
		firstElementChild: null,
		lastElementChild: null,
		nodeType: DomNodeType.DOCUMENT_FRAGMENT_NODE,
		ownerDocument: ssr ? document : null,
		textContent: '',
		append: jest.fn(),
		getElementById: jest.fn(() => null),
		querySelector: jest.fn(() => null),
		querySelectorAll: jest.fn(() => []),
		prepend: jest.fn(),
		replaceChildren: jest.fn(),
	});

	Object.entries(overrideProps).forEach(([key, value]) => {
		const prop = Object.getOwnPropertyDescriptor(documentFragment, key) || {
			writable: false,
		};

		Object.defineProperty(documentFragment, key, {
			...prop,
			value,
		});
	});

	return documentFragment as DocumentFragment;
};
