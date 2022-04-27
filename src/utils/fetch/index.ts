import { queryStringify } from '../index';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
type Methods = keyof typeof METHOD;

export type Options = {
  method: Methods;
  data?: any;
  headers?: Record<string, string>;
  responseType?: 'json' | 'text' | 'document' | 'blob' | 'arraybuffer';
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export type FetchResponse = {
  status: number;
  ok: boolean;
  data?: ArrayBuffer | Blob | Document | JSON | string;
};

export class Fetch {
  options: Options;

  constructor(options: Options = { method: METHOD.GET }) {
    this.options = options;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    let queries = '';
    if (options.data) {
      queries = queryStringify(options.data);
    }
    return this.request(url + queries, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.PATCH });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(url: string, options: Options = { method: METHOD.GET }): Promise<FetchResponse> {
    this.options = { ...this.options };
    return new Promise((resolve, reject) => {
      const { method, data, headers, responseType = 'json' } = options;

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.responseType = responseType;

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

      if (method === METHOD.GET || data === undefined) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
