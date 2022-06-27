import { FetchResponse } from '../utils/Fetch';
import { BaseAPI } from './base-api';

export type ProfileFormModel = {
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  phone: string;
};

export type PasswordFormModel = {
  oldPassword: string;
  newPassword: string;
};

export class UserApi extends BaseAPI {
  constructor() {
    super({ basePath: '/user' });
  }

  public updateProfile<D>(data: ProfileFormModel): Promise<FetchResponse<D>> {
    return this.put<D>('/profile', { data });
  }

  public updateAvatar<D>(data: FormData): Promise<FetchResponse<D>> {
    return this.put<D>('/profile/avatar', { data, headers: {} });
  }

  public updatePassword<D>(data: PasswordFormModel): Promise<FetchResponse<D>> {
    return this.put<D>('/password', { data });
  }

  public getUser<D>(id: string): Promise<FetchResponse<D>> {
    return this.get<D>(`/${id}`);
  }

  public searchUser<D>(login: string): Promise<FetchResponse<D>> {
    return this.post<D>('/search', { data: { login } });
  }
}
