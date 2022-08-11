import { Store } from './utils/Store';

const defaultAvatar = new URL('./assets/images/avatar.png', import.meta.url);

export type User = {
  id?: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Auth = {
  isAuth: boolean;
  user: User;
};

export type File = {
  id: string;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type Message = {
  chat_id: number;
  user_id: number;
  content: string;
  file: File | null;
  id: number;
  time: string;
  type: string;
  is_read: boolean;
  owner: boolean;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
  unread_count: number;
  last_message: Message;
};

export type ChatUser = User & {
  role: string;
};

export type Chats = {
  chats: Chat[];
  messages: Message[];
  activeChat: Chat | null;
  aboutChat: Chat | null;
  aboutChatUsers: ChatUser[] | null;
  token: string | null;
};

export type Users = {
  aboutUser: ChatUser | null;
};

export type NotifyItemType = 'error' | 'warning' | 'success'

export type NotifyItem = {
  value: string;
  type: NotifyItemType;
};

export type State = {
  users: Users;
  auth: Auth;
  chats: Chats;
  baseUrl: string;
  notify: NotifyItem[];
};

const initState: State = {
  users: {
    aboutUser: null,
  },
  auth: {
    isAuth: false,
    user: {
      id: undefined,
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: '',
      avatar: defaultAvatar.pathname,
    },
  },
  chats: {
    chats: [],
    messages: [],
    activeChat: null,
    aboutChat: null,
    aboutChatUsers: null,
    token: null,
  },
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  notify: [],
};

export const store = new Store<State>(initState);

export const addNotify = (value: string, type: NotifyItemType = 'error') => {
  store.state.notify = [...store.state.notify, { value, type }];
};
