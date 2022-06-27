import { FetchResponse } from '../utils/Fetch';
import { BaseAPI } from './base-api';

export type SigninFormModel = {
  login: string;
  password: string;
}

export type SignupFormModel = {
  email: string;
  password: string;
  first_name: string;
  second_name: string;
  login: string;
  phone: string;
}

export class AuthApi extends BaseAPI {
  constructor() {
    super({ basePath: '/auth' });
  }

  public signin<D>(data: SigninFormModel): Promise<FetchResponse<D>> {
    return this.post<D>('/signin', { data });
  }

  public signup<D>(data: SignupFormModel): Promise<FetchResponse<D>> {
    return this.post<D>('/signup', { data });
  }

  public getUser<D>(): Promise<FetchResponse<D>> {
    return this.get<D>('/user');
  }

  public logout<D>(): Promise<FetchResponse<D>> {
    return this.post<D>('/logout', {});
  }
}
