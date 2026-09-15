import { test } from 'node:test';
import assert from 'node:assert/strict';
import { api } from '../http.js';
import { users } from '../../src/api/users.js';

const path = '/api/v1/users/search';
const platform = [users[1], users[2]];
const lee = [users[1], users[3], users[0]];

test('team uses trimmed case-insensitive exact matching', async t => {
  const app = await api(t);
  for (const value of ['platform', 'PLATFORM', '%20Platform%20']) {
    const response = await app.get(`${path}?team=${value}`);
    assert.equal(response.status, 200, value);
    assert.deepEqual(response.body, { items: platform, total: 2 });
  }
  const partial = await app.get(`${path}?team=plat`);
  assert.equal(partial.status, 200);
  assert.deepEqual(partial.body, { items: [], total: 0 });
});

test('omitted and blank team preserve existing search behavior', async t => {
  const app = await api(t);
  for (const query of ['?q=lee', '?q=lee&team=', '?q=lee&team=%20%09']) {
    const response = await app.get(path + query);
    assert.equal(response.status, 200, query);
    assert.deepEqual(response.body, { items: lee, total: 3 });
  }
});

test('unknown team is a successful empty result', async t => {
  const app = await api(t);
  const response = await app.get(`${path}?team=unknown`);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { items: [], total: 0 });
});

test('team composes with q and total remains before limit', async t => {
  const app = await api(t);
  const response = await app.get(`${path}?unused=1&q=lee&team=platform&limit=1`);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { items: [users[1]], total: 1 });
});

test('repeated team values use the dedicated invalid-query envelope', async t => {
  const app = await api(t);
  for (const query of ['team=platform&team=platform', 'team=&team=', 'q=lee&team=data&team=platform']) {
    const response = await app.get(`${path}?${query}`);
    assert.equal(response.status, 400, query);
    assert.deepEqual(response.body, {
      error: { code: 'INVALID_QUERY', message: 'team must occur at most once.' },
    });
  }
});

test('team searches are repeatable, immutable and privacy-safe', async t => {
  const app = await api(t);
  const before = JSON.stringify(users);
  const first = await app.get(`${path}?q=Lee&team=platform&limit=1`);
  for (let index = 0; index < 3; index++) {
    assert.deepEqual(await app.get(`${path}?q=Lee&team=platform&limit=1`), first);
  }
  await app.get(`${path}?team=research&team=data`);
  assert.equal(JSON.stringify(users), before);
  assert.deepEqual(app.events, [
    ...Array.from({ length: 4 }, () => ({ route: 'search', status: 200 })),
    { route: 'search', status: 400 },
  ]);
});
