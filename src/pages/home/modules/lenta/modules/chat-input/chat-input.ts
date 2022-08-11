import { Block } from '../../../../../../utils/Block';
import { Icon } from '../../../../../../components/icon';
import { ChatsController } from '../../../../../../controllers/chats';
import { debounce } from '../../../../../../utils';
import { KeyboardKey } from '../../../../../../utils/enums/keyboardKeyEnum';
import { store, addNotify } from '../../../../../../store';
import styles from './chat-input.module.scss';
import tmpl from './chat-input.hbs';

const chatsController = new ChatsController();

export type ChatInputProps = {
  styles?: Record<string, string>;
  placeholder?: string;
  value?: string;
  smileIcon?: Icon;
  attachmentIcon?: Icon;
  deleteIcon?: Icon;
  sendIcon?: Icon;
};

export class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps = {}) {
    super({
      styles,
      placeholder: 'Write a message',
      smileIcon: new Icon({ icon: 'emoji-smile' }),
      attachmentIcon: new Icon({ icon: 'attachment' }),
      deleteIcon: new Icon({ icon: 'delete' }),
      sendIcon: new Icon({ icon: 'send' }),
      ...props,
    });
  }

  protected addEvents(): void | (() => void) {
    if (!this._element) {
      return;
    }

    const input = this._element.querySelector(`.${styles.input}`);
    const send = this._element.querySelector(`.${styles['send-icon']}`);

    if (!input || !send) {
      return;
    }

    const onSend = () => {
      let value = '';

      if (!store.state.chats.aboutChatUsers?.length) {
        addNotify('You must add the user to the chat!');
        return;
      }

      input.childNodes.forEach((node, idx, parent) => {
        const newLine = idx === parent.length - 1 ? '' : '\n';
        value += node.textContent?.trim() ? node.textContent : newLine;
      });

      if (value) {
        chatsController.sendLiveMessage(value);
        input.textContent = '';
      }
    };

    const onEnter = (e: KeyboardEvent) => {
      if (e.key === KeyboardKey.Enter && !e.shiftKey) {
        onSend();
      }
    };

    const debouncedEnter = debounce(onEnter, 300);

    (input as HTMLInputElement).addEventListener('keydown', debouncedEnter);
    send.addEventListener('click', onSend);

    return () => {
      (input as HTMLInputElement).removeEventListener('keydown', debouncedEnter);
      send.removeEventListener('click', onSend);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
