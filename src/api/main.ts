import { createApi } from './server.js';

const port = Number(process.env['PORT'] ?? 3000);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid PORT');
const server = createApi(event => console.log(JSON.stringify(event)));
server.listen(port, '127.0.0.1', () => console.error('API listening on loopback'));
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => server.close());
}
