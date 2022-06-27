import { Block } from '../../utils/Block';
import type { Validator } from '../../utils/fieldValidators';
import { KeyboardKey } from '../../utils/enums/keyboardKeyEnum';
import styles from './input.module.scss';
import tmpl from './input.hbs';

export type InputProps = {
  styles?: Record<string, string>;
  type?: string;
  outlined?: boolean;
  value?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  helper?: string;
  error?: boolean;
  validator?: Validator;
  onFocus?: (e?: Event) => void;
  onBlur?: (e?: Event) => void;
  onEnter?: (e: Event) => void;
};

export class Input extends Block<InputProps> {
  constructor(props: InputProps = {}) {
    super({
      styles,
      type: 'text',
      value: '',
      ...props,
    });
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }

    const box = this._element.querySelector(`.${styles['input-box']}`);
    const input = this._element.querySelector(`.${styles.input}`) as HTMLInputElement;
    const label = this._element.querySelector(`.${styles.label}`);

    if (!box || !input || !label) {
      return;
    }

    const { onBlur, onFocus, onEnter } = this.props;

    const handleFocus = (e: Event) => {
      if (onFocus) {
        onFocus(e);
      }

      if (!input.value.trim()) {
        label.classList.add(styles.focused);
        box.classList.add(styles.focused);
      }
    };

    const handleBlur = (e: Event) => {
      this.setProps({ value: input.value });

      if (onBlur) {
        onBlur(e);
      }

      this.validate();

      if (!input.value.trim()) {
        label.classList.remove(styles.focused);
        box.classList.remove(styles.focused);
      }
    };

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === KeyboardKey.Enter && onEnter) {
        onEnter(e);
      }
    };

    if (input) {
      if (input.value.trim()) {
        label.classList.add(styles.focused);
        box.classList.add(styles.focused);
      }
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      input.addEventListener('keydown', handleEnter);
    }

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('keydown', handleEnter);
    };
  }

  validate() {
    const { validator, value } = this.props;

    if (!validator) return;

    const { isValid, helper } = validator(value || '');

    if (!isValid) {
      this.setProps({ helper });
    }

    this.setProps({ error: !isValid });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
