import { FetchResponse } from '@./utils/Fetch';
import { BaseAPI } from '@/api/base-api';

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

  public getChats<D>(queries: GetChatQueriesModel): Promise<FetchResponse<D>> {
    return this.get<D>('/', queries);
  }

  public createChat<D>(title: string): Promise<FetchResponse<D>> {
    return this.post<D>('/', { data: { title } });
  }

  public deleteChat<D>(chatId: number): Promise<FetchResponse<D>> {
    return this.delete<D>('/', { data: { chatId } });
  }

  public updateAvatar<D>(data: FormData): Promise<FetchResponse<D>> {
    return this.put<D>('/avatar', { data, headers: {} });
  }

  public getUsers<D>(id: number, queries: GetChatUsersQueriesModel): Promise<FetchResponse<D>> {
    return this.get<D>(`/${id}/users`, queries);
  }

  public addUsers<D>(data: ChangeUsersInChatModel): Promise<FetchResponse<D>> {
    return this.put<D>('/users', { data });
  }

  public deleteUsers<D>(data: ChangeUsersInChatModel): Promise<FetchResponse<D>> {
    return this.delete<D>('/users', { data });
  }

  public getToken<D>(id: number): Promise<FetchResponse<D>> {
    return this.post<D>(`/token/${id}`, {});
  }
}
