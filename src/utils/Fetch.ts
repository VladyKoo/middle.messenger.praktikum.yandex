export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Methods = keyof typeof METHOD;

export type FetchOptions = {
  method?: Methods;
  data?: any;
  baseUrl?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'document' | 'blob' | 'arraybuffer';
};

export type OptionsWithoutMethod = Omit<FetchOptions, 'method'>;

export type FetchResponse = {
  status: number;
  ok: boolean;
  data?: any;
};

export class Fetch {
  options: FetchOptions;

  constructor(options: FetchOptions = {}) {
    this.options = { method: METHOD.GET, ...options };
  }

  public get(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  public post(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  public put(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  public patch(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.PATCH });
  }

  public delete(url: string, options: OptionsWithoutMethod = {}): Promise<FetchResponse> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  public request(url: string, options: FetchOptions = {}): Promise<FetchResponse> {
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

      if (method === METHOD.GET || data === undefined) {
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
