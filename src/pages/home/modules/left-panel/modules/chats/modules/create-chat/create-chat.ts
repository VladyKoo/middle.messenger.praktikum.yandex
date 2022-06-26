import { ChatsController } from '../../../../../../../../controllers/chats';
import { Block } from '../../../../../../../../utils/Block';
import { Icon } from '../../../../../../../../components/icon';
import styles from './create-chat.module.scss';
import tmpl from './create-chat.hbs';

const chatsController = new ChatsController();

export type CreateChatProps = {
  styles?: Record<string, string>;
  createChatIcon?: Icon;
  showInput?: boolean;
};

export class CreateChat extends Block<CreateChatProps> {
  constructor(props: CreateChatProps = {}) {
    super({
      styles,
      createChatIcon: new Icon({ icon: 'new-chat' }),
      ...props,
    });
  }

  addEvents(): void | (() => void) {
    if (!this._element) {
      return;
    }

    const btn = this._element.querySelector(`.${styles.btn}`);
    const input = this._element.querySelector(`.${styles.input}`) as HTMLInputElement;

    if (this.props.showInput) {
      input.focus();
    }

    if (!btn || !input) {
      return;
    }

    const onClick = () => {
      this.setProps({ showInput: !this.props.showInput });
    };

    const onEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const value = (e.target as HTMLInputElement).value.trim();
        if (value) {
          chatsController.createChat(value);
          this.setProps({ showInput: false });
        }
      }
    };

    const onBlur = () => {
      this.setProps({ showInput: false });
    };

    btn.addEventListener('click', onClick);
    input.addEventListener('keydown', onEnter);
    input.addEventListener('blur', onBlur);

    return () => {
      btn.removeEventListener('click', onClick);
      input.removeEventListener('keydown', onEnter);
      input.removeEventListener('blur', onBlur);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
