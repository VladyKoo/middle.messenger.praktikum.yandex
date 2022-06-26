import { store, User } from '../store';
import { ResourcesController } from './resources';
import { UserApi, ProfileFormModel, PasswordFormModel } from '../api/user-api';

const userApi = new UserApi();

export class UserController {
  public async changeProfile(payload: ProfileFormModel) {
    try {
      const { state } = store;
      const result = await userApi.updateProfile(payload);

      if (result.ok) {
        const data = result.data as User;

        state.auth.user.first_name = data.first_name || '';
        state.auth.user.second_name = data.second_name || '';
        state.auth.user.display_name = data.display_name || '';
        state.auth.user.login = data.login || '';
        state.auth.user.email = data.email || '';
        state.auth.user.phone = data.phone || '';
      }

      if (result.status === 401) {
        state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async changePassword(payload: PasswordFormModel) {
    try {
      const result = await userApi.updatePassword(payload);

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async changeAvatar(payload: FormData) {
    try {
      const result = await userApi.updateAvatar(payload);

      if (result.ok) {
        store.state.auth.user.avatar = ResourcesController.getResourcePath(result.data.avatar);
      }

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async searchUser(login: string) {
    try {
      const result = await userApi.searchUser(login);

      if (result.ok) {
        return result.data;
      }

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
