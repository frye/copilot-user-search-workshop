import { createServer, type Server } from 'node:http';
import { searchUsers, type Result } from './search.js';
import { users } from './users.js';

export type AccessEvent = Readonly<{ route: 'health' | 'list' | 'get' | 'search' | 'unknown'; status: number }>;

export function createApi(log: (event: AccessEvent) => void = () => {}): Server {
  return createServer((req, res) => {
    let result: Result = { status: 404, body: { error: { code: 'NOT_FOUND', message: 'Resource not found.' } } };
    let route: AccessEvent['route'] = 'unknown';
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (req.method === 'GET') {
      if (url.pathname === '/health') {
        route = 'health';
        result = { status: 200, body: { status: 'ok' } };
      } else if (url.pathname === '/api/v1/users') {
        route = 'list';
        result = { status: 200, body: { items: users, total: users.length } };
      } else if (url.pathname === '/api/v1/users/search') {
        route = 'search';
        result = searchUsers(url.searchParams);
      } else if (/^\/api\/v1\/users\/[^/]+$/.test(url.pathname)) {
        route = 'get';
        const user = users.find(item => item.id === url.pathname.slice('/api/v1/users/'.length));
        if (user) result = { status: 200, body: user };
      }
    }
    log({ route, status: result.status });
    res.writeHead(result.status, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(result.body));
  });
}
