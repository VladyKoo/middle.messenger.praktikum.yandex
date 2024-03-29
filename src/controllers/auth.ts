import { router } from '@/router';
import { store, User, addNotify } from '@/store';
import { ResourcesController } from '@/controllers/resources';
import { AuthApi, SigninFormModel, SignupFormModel } from '@/api/auth-api';
import { StatusCode } from '@/utils/enums/statusCodeEnum';

const authApi = new AuthApi();

export class AuthController {
  public async signin(payload: SigninFormModel) {
    try {
      const result = await authApi.signin(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = true;
        router.go('/messenger');
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async signup(payload: SignupFormModel) {
    try {
      const result = await authApi.signup(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = true;
        router.go('/messenger');
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async logout() {
    try {
      const result = await authApi.logout();

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        store.state.auth.isAuth = false;
        router.go('/');
      }
    } catch (error) {
      console.error(error);

      addNotify('Something went wrong');
    }
  }

  public async getUser() {
    try {
      const { state } = store;
      const result = await authApi.getUser<User>();

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        state.auth.isAuth = false;
      }

      if (result.ok && result.data) {
        const { data } = result;

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

      addNotify('Something went wrong');
    }
  }
}
