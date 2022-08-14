import { store, User, addNotify } from '@/store';
import { ResourcesController } from '@/controllers/resources';
import { UserApi, ProfileFormModel, PasswordFormModel } from '@/api/user-api';
import { StatusCode } from '@/utils/enums/statusCodeEnum';

const userApi = new UserApi();

export class UserController {
  public async changeProfile(payload: ProfileFormModel) {
    try {
      const { state } = store;
      const result = await userApi.updateProfile<User>(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        state.auth.isAuth = false;
      }

      if (result.ok && result.data) {
        const { data } = result;

        state.auth.user.first_name = data.first_name || '';
        state.auth.user.second_name = data.second_name || '';
        state.auth.user.display_name = data.display_name || '';
        state.auth.user.login = data.login || '';
        state.auth.user.email = data.email || '';
        state.auth.user.phone = data.phone || '';

        addNotify('Profile changed', 'success');
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async changePassword(payload: PasswordFormModel) {
    try {
      const result = await userApi.updatePassword(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        addNotify('Password changed', 'success');
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async changeAvatar(payload: FormData) {
    try {
      const result = await userApi.updateAvatar<Pick<User, 'avatar'>>(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok && result.data) {
        store.state.auth.user.avatar = ResourcesController.getResourcePath(result.data.avatar);
        addNotify('Avatar changed', 'success');
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public async searchUser(login: string) {
    try {
      const result = await userApi.searchUser<User[]>(login);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }

      if (result.ok) {
        return result.data;
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }
}
