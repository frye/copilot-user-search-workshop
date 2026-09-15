import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import type { TestContext } from 'node:test';
import { createApi, type AccessEvent } from '../src/api/server.js';

export async function api(t: TestContext) {
  const events: AccessEvent[] = [];
  const server = createApi(event => events.push(event));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  });
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  return {
    events,
    async get(path: string, method = 'GET') {
      const response = await fetch(base + path, { method });
      return { status: response.status, type: response.headers.get('content-type'), body: await response.json() as unknown };
    },
  };
}
