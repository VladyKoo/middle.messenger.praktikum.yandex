import { Block } from './Block';

export type Render = (component: Block) => void;

export type Root = {
  render: Render;
}

export function createRoot(container: HTMLElement | null): Root {
  if (!container) {
    throw new Error('Target container is not a DOM element');
  } else {
    const render = (component: Block) => {
      const child = component.getContent();
      if (child) {
        container.innerHTML = '';
        container.appendChild(child);
      }
    };
    return { render };
  }
}
