import { users } from './users.js';

export interface Result {
  status: number;
  body: unknown;
}

export function searchUsers(params: URLSearchParams): Result {
  const rawLimit = params.get('limit');
  if (params.getAll('q').length > 1 || params.getAll('limit').length > 1 ||
      (rawLimit !== null && !/^(?:[1-9]|1[0-9]|2[0-5])$/.test(rawLimit))) {
    return { status: 400, body: { error: { code: 'INVALID_QUERY', message: 'q and limit must occur at most once; limit must be an integer from 1 to 25 without leading zeros.' } } };
  }
  const q = (params.get('q') ?? '').trim().toLowerCase();
  const matches = users.filter(user => user.fullName.toLowerCase().includes(q))
    .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return { status: 200, body: { items: matches.slice(0, Number(rawLimit ?? 10)), total: matches.length } };
}
