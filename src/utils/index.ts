export function getTime(timestamp: string): string {
  if (!timestamp) {
    return '';
  }

  const data = new Date(timestamp);

  const H = data.getHours();
  const HH = H < 10 ? `0${H}` : `${H}`;
  const m = data.getMinutes();
  const mm = m < 10 ? `0${m}` : `${m}`;

  return `${HH}:${mm}`;
}

export function debounce(callback: Function, time: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => callback.call(null, ...args), time);
  };
}

export function isPlainObject(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

function objectToQueryString(obj: object, name: string = ''): string {
  const result: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      result.push(objectToQueryString(value, `${name}[${key}]`));
    } else {
      result.push(`${name}[${key}]=${value}`);
    }
  });

  return result.join('&');
}

export function queryStringify(data: Record<string, any>): string | never {
  const result: string[] = [];
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value === '') {
      return;
    }
    if (isArray(value)) {
      value.forEach((item: unknown, i: number) => {
        result.push(`${key}[${i}]=${item}`);
      });
    } else if (isPlainObject(value)) {
      result.push(objectToQueryString(value, key));
    } else {
      result.push(`${key}=${value}`);
    }
  });

  return result.join('&');
}

export function deepCompare<T>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function getType(value: unknown): string {
  const str = Object.prototype.toString.call(value);
  return str.slice(8, -1);
}

export function cloneDeep(target: unknown, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  const type = getType(target);

  let result: any = null;

  if (map.get(target)) {
    return map.get(target);
  }

  map.set(target, result);

  if (type === 'Object') {
    result = Object.assign(Object.create(Object.getPrototypeOf(target)), target);

    Object.entries(target).forEach(([key, value]) => {
      result[key] = cloneDeep(value as any, map);
    });

    return result;
  }

  if (type === 'Array' && Array.isArray(target)) {
    result = [];

    target.forEach((item) => {
      result.push(cloneDeep(item, map));
    });

    return result;
  }

  return target;
}

export function escape(string: string) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  /* eslint no-useless-escape: off */
  return string.replace(/[&<>"'\/]/g, (match: string) => htmlEscapes[match as keyof typeof htmlEscapes]);
}
