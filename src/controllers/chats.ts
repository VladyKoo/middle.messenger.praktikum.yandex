import { store, Chat, ChatUser, Message, addNotify } from '../store';
import { ResourcesController } from './resources';
import {
  ChatsApi,
  GetChatQueriesModel,
  ChangeUsersInChatModel,
  GetChatUsersQueriesModel,
} from '../api/chats-api';
import { WebSocketApi } from '../api/websocket-api';
import { StatusCode } from '../utils/enums/statusCodeEnum';

const defaultAvatar = new URL('../assets/images/avatar.png', import.meta.url);

const chatsApi = new ChatsApi();
const webSocketApi = new WebSocketApi();

export class ChatsController {
  public async getChats(queries: Partial<GetChatQueriesModel> = {}) {
    try {
      const result = await chatsApi.getChats<Chat[]>({ offset: 0, limit: 20, ...queries });

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok && result.data) {
        const chats = result.data.map((chat) => ({
          ...chat,
          avatar: chat.avatar ? ResourcesController.getResourcePath(chat.avatar) : defaultAvatar.pathname,
        }));

        store.state.chats.chats = chats;
        /* eslint no-unneeded-ternary: "error" */

        const activeChat = chats.find((el) => el.id === store.state.chats?.activeChat?.id);
        store.state.chats.activeChat = activeChat ? activeChat : null;

        const aboutChat = chats.find((el) => el.id === store.state.chats?.aboutChat?.id);
        store.state.chats.aboutChat = aboutChat ? aboutChat : null;
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async createChat(title: string) {
    try {
      const result = await chatsApi.createChat(title);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        this.getChats();
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async deleteChat(chatId: number) {
    try {
      const result = await chatsApi.deleteChat(chatId);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        this.getChats();
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async changeAvatar(payload: FormData) {
    try {
      const result = await chatsApi.updateAvatar(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        this.getChats();
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async getChatUsers(id: number, queries: Partial<GetChatUsersQueriesModel> = {}) {
    try {
      const result = await chatsApi.getUsers<ChatUser[]>(id, { offset: 0, limit: 5, ...queries });

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok && result.data) {
        const chatUsers = result.data.reduce((acc, chatUser) => {
          if (chatUser.id !== store.state.auth.user.id) {
            acc.push({
              ...chatUser,
              avatar: chatUser.avatar
                ? ResourcesController.getResourcePath(chatUser.avatar)
                : defaultAvatar.pathname,
            });
          }
          return acc;
        }, [] as typeof result.data);

        store.state.chats.aboutChatUsers = chatUsers.length ? chatUsers : null;

        return chatUsers;
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async addUsersToChat(payload: ChangeUsersInChatModel) {
    try {
      const result = await chatsApi.addUsers(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        this.getChatUsers(payload.chatId);
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async deleteUsersFromChat(payload: ChangeUsersInChatModel) {
    try {
      const result = await chatsApi.deleteUsers(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        this.getChatUsers(payload.chatId);
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async getChatToken(chatId: number) {
    try {
      const result = await chatsApi.getToken<Record<string, string>>(chatId);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
        return null;
      }

      if (result.ok && result.data) {
        store.state.chats.token = result.data.token;
        return result.data.token;
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');

      return null;
    }
  }

  public async openLiveChat(userId: number, chatId: number) {
    try {
      const token = await this.getChatToken(chatId);

      if (!token) {
        return;
      }

      await webSocketApi.connect(userId, chatId, token);

      webSocketApi.onMessage = (data) => this.onMessage(data, userId, chatId);

      this.getLiveMessages();
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async closeLiveChat() {
    try {
      webSocketApi.disconect();
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  private onMessage(data: Message[] | Message, userId: number, chatId: number) {
    if (!data) {
      return;
    }

    if (Array.isArray(data)) {
      const messages = data.map((massage) => ({
        ...massage,
        owner: massage.user_id === userId,
      }));

      store.state.chats.messages = messages;
    } else if (data.type === 'message') {
      const message = {
        chat_id: chatId,
        user_id: data.user_id,
        content: data.content,
        file: data.file || null,
        id: data.id,
        time: data.time,
        type: data.type,
        is_read: true,
        owner: data.user_id === userId,
      };

      store.state.chats.messages = [message, ...store.state.chats.messages];
    }
  }

  public async getLiveMessages() {
    try {
      webSocketApi.getMessages(0);
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async sendLiveMessage(message: string) {
    try {
      webSocketApi.sendMessage({ content: message });
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }
}
