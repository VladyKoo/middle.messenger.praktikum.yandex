import { Block } from '../../../../../../utils/Block';
import { Avatar } from '../../../../../../components/avatar';
import { Search } from '../../../../../../components/search';
import { ChatItem } from '../../../../../../components/chat-item';
import { RouterLink } from '../../../../../../components/router-link';
import { CreateChat } from './modules/create-chat';
import { store, State, Chat } from '../../../../../../store';
import { deepCompare } from '../../../../../../utils';
import { ChatsController } from '../../../../../../controllers/chats';
import styles from './chats.module.scss';
import tmpl from './chats.hbs';

const chatsController = new ChatsController();

function getChats(chats: Chat[]): ChatItem[] {
  /* eslint implicit-arrow-linebreak: off */
  return chats.map(
    (chat) =>
      new ChatItem({
        avatar: chat.avatar,
        id: chat.id,
        title: chat.title,
        lastMessage: chat.last_message ? chat.last_message.content : '',
        time: chat.last_message ? chat.last_message.time : '',
        counter: chat.unread_count,
        handleClick: () => {
          if (store.state.chats.activeChat && store.state.chats.activeChat.id === chat.id) {
            return;
          }

          store.state.chats.activeChat = chat;

          if (store.state.chats.aboutChat) {
            store.state.chats.aboutChat = chat;
          }

          chatsController.getChatUsers(chat.id).then((data) => {
            const userId = store.state.auth.user.id;
            if (data?.length && userId) {
              chatsController.openLiveChat(userId, chat.id);
            } else {
              chatsController.closeLiveChat();
              store.state.chats.messages = [];
            }
          });
        },
      }),
  );
}

function mapStateToProps(state: State) {
  return {
    avatar: state.auth.user.avatar,
    chats: state.chats.chats,
  };
}

export type ChatsProps = {
  styles?: Record<string, string>;
  avatar?: string;
  chatItems?: ChatItem[];
  createChat?: CreateChat;
  chats?: Chat[];
  search?: Search;
  link?: RouterLink;
};

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      createChat: new CreateChat(),
      search: new Search({}),
      chatItems: getChats(propsAndState.chats),
      link: new RouterLink({
        href: '/profile',
        class: styles['top-avatar'],
        content: new Avatar({ url: propsAndState.avatar }),
      }),
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = mapStateToProps(store.state);

      if (!deepCompare(state, newState)) {
        this.setProps({ ...newState, chatItems: getChats(newState.chats) });
      }

      state = newState;
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate() {
    if (typeof this.children.link?.props?.content === 'object') {
      this.children.link?.props?.content?.setProps({ url: this.props.avatar });
    }
  }
}
