export function queryStringify(data = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const queries = Object.entries(data).reduce((acc, [key, value]) => `${acc}${key}=${value}&`, '');
  return queries ? `?${queries.slice(0, -1)}` : queries;
}

export function deepClone<T>(obj: T): T {
  if (!obj || typeof obj === 'function') {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

export function deepCompare<T>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function getTime(timestamp: string): string {
  const data = new Date(timestamp);

  const H = data.getHours();
  const HH = H < 10 ? `0${H}` : `${H}`;
  const m = data.getMinutes();
  const mm = m < 10 ? `0${m}` : `${m}`;

  return `${HH}:${mm}`;
}
