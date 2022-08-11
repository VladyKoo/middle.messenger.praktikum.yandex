import { Block } from '../../utils/Block';
import styles from './form.module.scss';
import tmpl from './form.hbs';

export type FormProps = {
  styles?: Record<string, string>;
  fields: Block[];
  button: Block;
  handleSubmit: (e: Event) => void;
};

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ styles, ...props }, 'form');
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }
    const form = this._element;
    form.addEventListener('submit', this.props.handleSubmit);

    return () => {
      form.removeEventListener('submit', this.props.handleSubmit);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
