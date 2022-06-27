/* eslint no-param-reassign: ["error", { "props": false }] */
import { store } from '../store';
import { queryStringify } from '../utils';
import { Fetch, FetchResponse, FetchOptions } from '../utils/Fetch';

export type BaseApiOptions = FetchOptions & {
  basePath?: string;
  queries?: Record<string, unknown>;
};

export class BaseAPI {
  protected fetch: Fetch;

  protected baseUrl: string;

  protected basePath: string;

  constructor(options: BaseApiOptions = {}) {
    this.baseUrl = options.baseUrl || store.state.baseUrl || '';
    this.basePath = options.basePath || '';

    this.fetch = new Fetch({
      baseUrl: this.baseUrl,
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
      ...options,
    });
  }

  queryStringify(queries?: Record<string, unknown>): string {
    let queryString = '';
    if (queries) {
      queryString = `?${queryStringify(queries)}`;
    }
    return queryString;
  }

  get<D>(path: string, queries?: Record<string, unknown>, options?: FetchOptions): Promise<FetchResponse<D>> {
    return this.fetch.get<D>(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  post<D>(path: string, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse<D>> {
    return this.fetch.post<D>(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  put<D>(path: string, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse<D>> {
    return this.fetch.put<D>(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  delete<D>(path: string, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse<D>> {
    return this.fetch.delete<D>(
      `${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`,
      options,
    );
  }
}
