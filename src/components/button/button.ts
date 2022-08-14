import { Block } from '@/utils/Block';
import styles from './button.module.scss';
import tmpl from './button.hbs';

export type ButtonProps = {
  styles?: Record<string, string>;
  style?: string;
  title: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  handleClick?: (e: Event) => void;
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ styles, type: 'button', disabled: false, ...props }, 'button');
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  addEvents(): void | (() => void) {
    if (!this._element) {
      return;
    }

    const btn = this._element;

    const onClick = (e: Event) => {
      if (this.props.handleClick) {
        this.props.handleClick(e);
      }
    };

    btn.addEventListener('click', onClick);

    return () => {
      btn.removeEventListener('click', onClick);
    };
  }
}
