import { Block } from '../../utils/Block';
import styles from './button.module.scss';
import tmpl from './button.hbs';

export type ButtonProps = {
  styles?: Record<string, string>;
  style?: string;
  title: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ styles, type: 'button', disabled: false, ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
