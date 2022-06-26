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

  public signin(data: SigninFormModel): Promise<FetchResponse> {
    return this.post('/signin', { data });
  }

  public signup(data: SignupFormModel): Promise<FetchResponse> {
    return this.post('/signup', { data });
  }

  public getUser(): Promise<FetchResponse> {
    return this.get('/user');
  }

  public logout(): Promise<FetchResponse> {
    return this.post('/logout', {});
  }
}
