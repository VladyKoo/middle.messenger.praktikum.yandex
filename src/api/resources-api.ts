import { FetchResponse } from '../utils/Fetch';
import { BaseAPI } from './base-api';

export class ResourcesApi extends BaseAPI {
  constructor() {
    super({ basePath: '/resources' });
  }

  public getResource<D>(path: string): Promise<FetchResponse<D>> {
    return this.post<D>(`/${path}`, {});
  }

  public updateResource<D>(data: FormData): Promise<FetchResponse<D>> {
    return this.post<D>('/', { data });
  }
}
