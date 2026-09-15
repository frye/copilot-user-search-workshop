import { test } from 'node:test';
import assert from 'node:assert/strict';
import { api } from '../http.js';
import { users } from '../../src/api/users.js';

const sorted = [users[1], users[3], users[0], users[2]];
const lee = sorted.slice(0, 3);
const path = '/api/v1/users/search';

test('anchor: search route wins over get-by-id; total is before limit', async t => {
  const app = await api(t);
  const response = await app.get(`${path}?q=lee&limit=1`);
  assert.equal(response.status, 200, 'Search must return 200; starter deliberately returns 501');
  assert.deepEqual(response.body, { items: [users[1]], total: 3 });
});

test('trimmed case-insensitive substring and empty/default queries', async t => {
  const app = await api(t);
  for (const [query, items] of [
    ['', sorted], ['?q=', sorted], ['?q=%20%09', sorted],
    ['?q=%20lEe%20', lee], ['?q=ery%20le', [users[1]]],
    ['?q=research', []], ['?q=not-found', []], ['?q=%F0%9F%90%99', []],
  ] as const) {
    const response = await app.get(path + query);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { items, total: items.length });
  }
});

test('all valid integer limits including boundaries', async t => {
  const app = await api(t);
  for (let limit = 1; limit <= 25; limit++) {
    const response = await app.get(`${path}?limit=${limit}`);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { items: sorted.slice(0, limit), total: 4 });
  }
});

test('reject invalid decimal syntax and repeated parameters with exact envelope', async t => {
  const app = await api(t);
  const invalid = ['', '0', '26', '-1', '+1', '01', '1.0', '1e1', ' 1', '1 ', 'Infinity', 'NaN', '0x10', '１', '999999999999999999'];
  const queries = invalid.map(value => `limit=${encodeURIComponent(value)}`);
  queries.push('q=lee&q=lee', 'q=&q=', 'limit=1&limit=1', 'q=x&limit=2&limit=3');
  for (const query of queries) {
    const response = await app.get(`${path}?${query}`);
    assert.equal(response.status, 400, query);
    assert.deepEqual(response.body, { error: { code: 'INVALID_QUERY', message: 'q and limit must occur at most once; limit must be an integer from 1 to 25 without leading zeros.' } });
  }
});

test('repeatable results never mutate fixture and never log query, names or payloads', async t => {
  const app = await api(t);
  const before = JSON.stringify(users);
  const first = await app.get(`${path}?q=Lee&limit=1`);
  for (let i = 0; i < 3; i++) assert.deepEqual(await app.get(`${path}?q=Lee&limit=1`), first);
  await app.get(`${path}?q=Avery%20Lee&limit=01`);
  assert.equal(JSON.stringify(users), before);
  assert.deepEqual(app.events, [
    ...Array.from({ length: 4 }, () => ({ route: 'search', status: 200 })),
    { route: 'search', status: 400 },
  ]);
  assert.deepEqual((await app.get('/api/v1/users')).body, { items: users, total: 4 });
});

test('unknown query keys do not alter singleton parsing, matching or total', async t => {
  const app = await api(t);
  const response = await app.get(`${path}?unused=1&q=LEE&limit=2&unused=2`);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { items: [users[1], users[3]], total: 3 });
});
