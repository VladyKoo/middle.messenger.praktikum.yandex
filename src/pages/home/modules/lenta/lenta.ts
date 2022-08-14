import { Block } from '@/utils/Block';
import { deepCompare, escape } from '@/utils';
import { store, State, Message } from '@/store';
import { Avatar } from '@/components/avatar';
import { Search } from '@/components/search';
import { MessageItem } from './modules/message-item';
import { ChatInput } from './modules/chat-input/chat-input';
import styles from './lenta.module.scss';
import tmpl from './lenta.hbs';

function getMessageItems(messages: Message[]) {
  return messages.reduceRight((acc, message) => {
    acc.push(
      new MessageItem({
        ...message,
        content: escape(message.content),
      }),
    );
    return acc;
  }, [] as MessageItem[]);
}

function mapStateToProps(state: State) {
  return {
    show: state.chats.activeChat !== null,
    avatar: state.chats.activeChat?.avatar,
    messages: state.chats.messages,
  };
}

export type LentaProps = {
  styles?: Record<string, string>;
  show?: boolean;
  avatarImg?: Avatar;
  avatar?: string;
  search?: Search;
  messages?: Message[];
  messageItems?: MessageItem[];
  chatInput?: ChatInput;
};

export class Lenta extends Block<LentaProps> {
  constructor(props: LentaProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      avatarImg: new Avatar({ url: propsAndState.avatar }),
      search: new Search(),
      messageItems: getMessageItems(propsAndState.messages),
      chatInput: new ChatInput(),
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = mapStateToProps(store.state);

      if (!deepCompare(state, newState)) {
        this.setProps({ ...newState, messageItems: getMessageItems(newState.messages) });
      }

      state = newState;
    });
  }

  protected addEvents(): void | (() => void) {
    if (!this._element) {
      return;
    }

    const avatarBtn = this._element.querySelector(`.${styles['top-avatar']}`);
    const messageBox = this._element.querySelector(`.${styles['message-box']}`);

    if (!avatarBtn || !messageBox) {
      return;
    }

    messageBox.scrollTop = messageBox.scrollHeight;

    const showAboutPanel = () => {
      const { chats } = store.state;
      chats.aboutChat = chats.activeChat;
    };

    avatarBtn.addEventListener('click', showAboutPanel);

    return () => {
      avatarBtn.removeEventListener('click', showAboutPanel);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate() {
    this.children.avatarImg?.setProps({ url: this.props.avatar });
  }
}
