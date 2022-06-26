import { store } from '../store';
import { ResourcesApi } from '../api/resources-api';

const resourcesApi = new ResourcesApi();

export class ResourcesController {
  public async getResource(path: string) {
    try {
      const result = await resourcesApi.getResource(path);

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public static getResourcePath(path: string): string {
    return `${store.state.baseUrl || ''}/resources${path}`;
  }

  public async uploadResource(payload: FormData) {
    try {
      const result = await resourcesApi.updateResource(payload);

      if (result.status === 401) {
        store.state.auth.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
