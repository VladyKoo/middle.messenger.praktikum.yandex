export function queryStringify(data = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const queries = Object.entries(data).reduce((acc, [key, value]) => `${acc}${key}=${value}&`, '');
  return queries ? `?${queries.slice(0, -1)}` : queries;
}

export function isEmpty() {}
