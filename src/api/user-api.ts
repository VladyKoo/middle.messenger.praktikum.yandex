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

  public updateProfile(data: ProfileFormModel): Promise<FetchResponse> {
    return this.put('/profile', { data });
  }

  public updateAvatar(data: FormData): Promise<FetchResponse> {
    return this.put('/profile/avatar', { data, headers: {} });
  }

  public updatePassword(data: PasswordFormModel): Promise<FetchResponse> {
    return this.put('/password', { data });
  }

  public getUser(id: string): Promise<FetchResponse> {
    return this.get(`/${id}`);
  }

  public searchUser(login: string): Promise<FetchResponse> {
    return this.post('/search', { data: { login } });
  }
}
