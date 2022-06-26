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

  get(path, queries?: Record<string, unknown>, options?: FetchOptions): Promise<FetchResponse> {
    return this.fetch.get(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  post(path, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse> {
    return this.fetch.post(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  put(path, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse> {
    return this.fetch.put(`${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`, options);
  }

  delete(path, options: FetchOptions, queries?: Record<string, unknown>): Promise<FetchResponse> {
    return this.fetch.delete(
      `${this.baseUrl}${this.basePath}${path}${this.queryStringify(queries)}`,
      options,
    );
  }
}
