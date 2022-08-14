import { ChatsController } from '@/controllers/chats';
import { Block } from '@/utils/Block';
import { ProfileInfo } from '@/components/profile-info';
import { Icon } from '@/components/icon';
import { Button } from '@/components/button';
import { State, store } from '@/store';
import { deepCompare } from '@/utils';
import styles from './about-user.module.scss';
import tmpl from './about-user.hbs';

const chatsController = new ChatsController();

function mapStateToProps(state: State) {
  const { aboutUser } = state.users;
  return {
    id: aboutUser?.id || null,
    first_name: aboutUser?.first_name || '',
    second_name: aboutUser?.second_name || '',
    display_name: aboutUser?.display_name || '',
    login: aboutUser?.first_name || '',
    email: aboutUser?.email || '',
    phone: aboutUser?.phone || '',
    avatar: aboutUser?.avatar || '',
    chatId: state.chats.activeChat?.id || null,
  };
}

export type AboutUserProps = {
  styles?: Record<string, string>;

  id?: number | null;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;

  chatId?: number | null;
  closeIcon?: Icon;
  deleteChat?: Button;
  profileInfo?: ProfileInfo;
};

export class AboutUser extends Block<AboutUserProps> {
  constructor(props: AboutUserProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      closeIcon: new Icon({ icon: 'arrow-left' }),
      deleteChat: new Button({
        title: 'Delete user from chat',
        style: 'background-color: red; color: white;',
        handleClick: () => this.deleteUserFromChat(),
      }),
      profileInfo: new ProfileInfo({
        avatar: propsAndState.avatar,
        first_name: propsAndState.first_name,
        second_name: propsAndState.second_name,
        display_name: propsAndState.display_name,
        login: propsAndState.login,
        phone: propsAndState.phone,
        email: propsAndState.email,
      }),
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = mapStateToProps(store.state);

      if (!deepCompare(state, newState)) {
        this.setProps({ ...newState });
      }

      state = newState;
    });
  }

  deleteUserFromChat() {
    if (this.props.id && this.props.chatId) {
      chatsController.deleteUsersFromChat({ chatId: this.props.chatId, users: [this.props.id] });
      store.state.users.aboutUser = null;
      store.state.chats.aboutChat = store.state.chats.activeChat;
    }
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
      store.state.users.aboutUser = null;
      store.state.chats.aboutChat = store.state.chats.activeChat;
    };

    closeBtn.addEventListener('click', onClose);

    return () => {
      closeBtn.removeEventListener('click', onClose);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate() {
    this.children.profileInfo?.setProps({
      avatar: this.props.avatar,
      first_name: this.props.first_name,
      second_name: this.props.second_name,
      display_name: this.props.display_name,
      login: this.props.login,
      phone: this.props.phone,
      email: this.props.email,
    });
  }
}
