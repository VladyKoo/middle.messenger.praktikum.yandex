import { Block } from './Block';

export function createRoot(container: Element | DocumentFragment | null) {
  if (!container) {
    throw new Error('Target container is not a DOM element');
  } else {
    const render = (component: Block) => {
      const child = component.getContent();
      if (child) {
        container.appendChild(child);
      }
    };
    return { render };
  }
}
