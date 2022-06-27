import { HttpMethod } from './enums/httpMethodEnum';

export type FetchOptions = {
  method?: keyof typeof HttpMethod;
  data?: any;
  baseUrl?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'document' | 'blob' | 'arraybuffer';
};

export type OptionsWithoutMethod = Omit<FetchOptions, 'method'>;

export type FetchResponse<D = unknown> = {
  status: number;
  ok: boolean;
  data?: D;
};

export class Fetch {
  options: FetchOptions;

  constructor(options: FetchOptions = {}) {
    this.options = { method: HttpMethod.GET, ...options };
  }

  public get<D>(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse<D>> {
    return this.request<D>(url, { ...options, method: HttpMethod.GET });
  }

  public post<D>(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse<D>> {
    return this.request<D>(url, { ...options, method: HttpMethod.POST });
  }

  public put<D>(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse<D>> {
    return this.request<D>(url, { ...options, method: HttpMethod.PUT });
  }

  public patch<D>(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse<D>> {
    return this.request<D>(url, { ...options, method: HttpMethod.PATCH });
  }

  public delete<D>(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse<D>> {
    return this.request<D>(url, { ...options, method: HttpMethod.DELETE });
  }

  public request<D>(url: string, options: FetchOptions = {}): Promise<FetchResponse<D>> {
    this.options = { ...this.options, ...options };

    return new Promise((resolve, reject) => {
      const { method = 'GET', data, headers, responseType = 'json', withCredentials = false } = this.options;

      const xhr = new XMLHttpRequest();
      xhr.open(method, this.getUrl(url));

      xhr.responseType = responseType;

      xhr.withCredentials = withCredentials;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve({
          status: xhr.status,
          ok: xhr.status >= 200 && xhr.status < 300,
          data: xhr.response,
        });
      };

      const handleError = (err: ProgressEvent) => {
        reject(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === HttpMethod.GET || data === undefined) {
        xhr.send();
      } else {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(body);
      }
    });
  }

  public getUrl(url: string) {
    const { baseUrl } = this.options;
    let fetchUrl = '';

    if (url.includes('://')) {
      fetchUrl = url;
    } else if (baseUrl) {
      fetchUrl = baseUrl + url;
    }

    return fetchUrl;
  }
}
