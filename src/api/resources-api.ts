import { FetchResponse } from '../utils/Fetch';
import { BaseAPI } from './base-api';

export class ResourcesApi extends BaseAPI {
  constructor() {
    super({ basePath: '/resources' });
  }

  public getResource(path: string): Promise<FetchResponse> {
    return this.post(`/${path}`, {});
  }

  public updateResource(data: FormData): Promise<FetchResponse> {
    return this.post('/', { data });
  }
}
