import { FetchResponse } from '../utils/Fetch';
import { BaseAPI } from './base-api';

export type GetChatQueriesModel = {
  offset: number;
  limit: number;
  title?: string;
};

export type GetChatUsersQueriesModel = {
  offset: number;
  limit: number;
  name?: string;
  email?: string;
};

export type ChangeUsersInChatModel = {
  users: number[];
  chatId: number;
};

export class ChatsApi extends BaseAPI {
  constructor() {
    super({ basePath: '/chats' });
  }

  public getChats(queries: GetChatQueriesModel): Promise<FetchResponse> {
    return this.get('/', queries);
  }

  public createChat(title: string): Promise<FetchResponse> {
    return this.post('/', { data: { title } });
  }

  public deleteChat(chatId: number): Promise<FetchResponse> {
    return this.delete('/', { data: { chatId } });
  }

  public updateAvatar(data: FormData): Promise<FetchResponse> {
    return this.put('/avatar', { data, headers: {} });
  }

  public getUsers(id: number, queries: GetChatUsersQueriesModel): Promise<FetchResponse> {
    return this.get(`/${id}/users`, queries);
  }

  public addUsers(data: ChangeUsersInChatModel): Promise<FetchResponse> {
    return this.put('/users', { data });
  }

  public deleteUsers(data: ChangeUsersInChatModel): Promise<FetchResponse> {
    return this.delete('/users', { data });
  }

  public getToken(id: number): Promise<FetchResponse> {
    return this.post(`/token/${id}`, {});
  }
}
