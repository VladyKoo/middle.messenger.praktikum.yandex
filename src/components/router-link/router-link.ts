import { Block } from '../../utils/Block';
import { router } from '../../router';
import tmpl from './router-link.hbs';

export type RouterLinkProps = {
  class?: string;
  target?: string;
  href?: string | number;
  content?: Block | string;
};

export class RouterLink extends Block<RouterLinkProps> {
  constructor(props: RouterLinkProps) {
    super({ target: '_self', ...props }, 'a');
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }

    const link = this._element;

    if (!link) {
      return;
    }
    const onClick = (e: Event) => {
      e.preventDefault();
      if (this.props.href) {
        router.go(this.props.href);
      }
    };

    link.addEventListener('click', onClick);

    return () => {
      link.removeEventListener('click', onClick);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
