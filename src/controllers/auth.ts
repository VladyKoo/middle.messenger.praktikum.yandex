import { router } from '../router';
import { store, User } from '../store';
import { ResourcesController } from './resources';
import { AuthApi, SigninFormModel, SignupFormModel } from '../api/auth-api';

const authApi = new AuthApi();

export class AuthController {
  public async signin(payload: SigninFormModel) {
    try {
      const result = await authApi.signin(payload);

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = true;
        router.go('/messenger');
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async signup(payload: SignupFormModel) {
    try {
      const result = await authApi.signup(payload);

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = true;
        router.go('/messenger');
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async logout() {
    try {
      const result = await authApi.logout();

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = false;
        router.go('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser() {
    try {
      const { state } = store;
      const result = await authApi.getUser();

      if (result.status === 401) {
        state.auth.isAuth = false;
      }

      if (result.ok) {
        const data = result.data as User;

        state.auth.isAuth = true;

        state.auth.user.id = data.id;
        state.auth.user.first_name = data.first_name || '';
        state.auth.user.second_name = data.second_name || '';
        state.auth.user.display_name = data.display_name || '';
        state.auth.user.login = data.login || '';
        state.auth.user.email = data.email || '';
        state.auth.user.phone = data.phone || '';

        if (data.avatar) {
          state.auth.user.avatar = ResourcesController.getResourcePath(data.avatar);
        }
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
