import { UserController } from '../../../../../../controllers/user';
import { Block } from '../../../../../../utils/Block';
import { Input } from '../../../../../../components/input';
import { ChatsController } from '../../../../../../controllers/chats';
import { ChangeAvatar } from '../../../../../../components/change-avatar';
import { ChatItem } from '../../../../../../components/chat-item';
import { Icon } from '../../../../../../components/icon';
import { Button } from '../../../../../../components/button';
import { State, store, ChatUser } from '../../../../../../store';
import { deepCompare } from '../../../../../../utils';
import styles from './about-chat.module.scss';
import tmpl from './about-chat.hbs';

const chatsController = new ChatsController();
const userController = new UserController();

function getChatUsers(chatUsers: ChatUser[]): ChatItem[] {
  return chatUsers.map(
    (chatUser) =>
      new ChatItem({
        avatar: chatUser.avatar,
        id: chatUser.id,
        title: `${chatUser.first_name} ${chatUser.second_name}`,
        handleClick: () => {
          if (store.state.users.aboutUser && store.state.users.aboutUser.id === chatUser.id) {
            return;
          }

          store.state.users.aboutUser = chatUser;
          store.state.chats.aboutChat = null;
        },
      }),
  );
}

function mapStateToProps(state: State) {
  return {
    avatar: state.chats.aboutChat?.avatar,
    chatId: state.chats.aboutChat?.id,
    chatUsers: state.chats.aboutChatUsers,
  };
}

export type AboutChatProps = {
  styles?: Record<string, string>;
  closeIcon?: Icon;
  changeAvatar?: ChangeAvatar;
  avatar?: string;
  addUserInput?: Input;
  chatId?: number;
  chatUsers?: ChatUser[] | null;
  chatUserItems?: ChatItem[];
  deleteChat?: Button;
};

export class AboutChat extends Block<AboutChatProps> {
  constructor(props: AboutChatProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      closeIcon: new Icon({ icon: 'close' }),
      deleteChat: new Button({
        title: 'Delete chat',
        style: 'background-color: red; color: white;',
        handleClick: () => this.deleteChat(),
      }),
      addUserInput: new Input({
        outlined: true,
        label: 'User login',
        onEnter: (e) => this.addUserToChat(e),
      }),
      changeAvatar: new ChangeAvatar({
        url: propsAndState.avatar,
        handleFile: (file) => this.changeChatAvatar(file),
      }),
      chatUserItems: getChatUsers(propsAndState.chatUsers || []),
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = mapStateToProps(store.state);

      if (!deepCompare(state, newState)) {
        this.setProps({ ...newState, chatUserItems: getChatUsers(newState.chatUsers || []) });
      }

      state = newState;
    });
  }

  changeChatAvatar(file: File) {
    if (!this.props.chatId) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file, file?.name);
    formData.append('chatId', this.props.chatId.toString());

    chatsController.changeAvatar(formData);
  }

  addUserToChat(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    if (!this.props.chatId) {
      return;
    }
    userController.searchUser(value).then((data) => {
      const firstUser = 0;

      const { id } = data?.[firstUser] || {};
      if (id && this.props.chatId) {
        chatsController.addUsersToChat({ chatId: this.props.chatId, users: [id] });
        target.value = '';
      }
    });
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }

    const closeBtn = this._element.querySelector(`.${styles['top-close-btn']}`);

    if (!closeBtn) {
      return;
    }

    const onClose = () => {
      store.state.chats.aboutChat = null;
    };

    closeBtn.addEventListener('click', onClose);

    return () => {
      closeBtn.removeEventListener('click', onClose);
    };
  }

  deleteChat() {
    if (!this.props.chatId) {
      return;
    }

    chatsController.deleteChat(this.props.chatId);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate(oldProps: AboutChatProps, newProps: AboutChatProps) {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.changeAvatar?.setProps({ url: this.props.avatar });
    }
  }
}
