import { store, addNotify } from '../store';
import { ResourcesApi } from '../api/resources-api';
import { StatusCode } from '../utils/enums/statusCodeEnum';

const resourcesApi = new ResourcesApi();

export class ResourcesController {
  public async getResource(path: string) {
    try {
      const result = await resourcesApi.getResource(path);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }

  public static getResourcePath(path: string): string {
    return `${store.state.baseUrl || ''}/resources${path}`;
  }

  public async uploadResource(payload: FormData) {
    try {
      const result = await resourcesApi.updateResource(payload);

      if (result.status === StatusCode.ClientErrorUnauthorized) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
      addNotify('Something went wrong');
    }
  }
}
