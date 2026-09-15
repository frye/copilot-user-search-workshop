import { test } from 'node:test';
import assert from 'node:assert/strict';
import { api } from '../http.js';
import { users } from '../../src/api/users.js';

test('health, archived list order and get remain stable', async t => {
  const app = await api(t);
  assert.deepEqual((await app.get('/health')).body, { status: 'ok' });
  const list = await app.get('/api/v1/users');
  assert.equal(list.status, 200);
  assert.equal(list.type, 'application/json; charset=utf-8');
  assert.deepEqual(list.body, { items: [
    { id: 'u-003', fullName: 'Casey Lee', team: 'research' },
    { id: 'u-001', fullName: 'Avery Lee', team: 'platform' },
    { id: 'u-004', fullName: 'Riley Chen', team: 'platform' },
    { id: 'u-002', fullName: 'Morgan Lee', team: 'data' },
  ], total: 4 });
  for (const user of users) assert.deepEqual((await app.get(`/api/v1/users/${user.id}`)).body, user);
});

test('unknown routes and unsupported methods have exact error envelope', async t => {
  const app = await api(t);
  for (const [path, method] of [['/api/v1/users/missing', 'GET'], ['/api/v1/users/u-001/extra', 'GET'], ['/health', 'POST']]) {
    const result = await app.get(path!, method!);
    assert.equal(result.status, 404);
    assert.deepEqual(result.body, { error: { code: 'NOT_FOUND', message: 'Resource not found.' } });
  }
});

test('fixtures are frozen; logs expose only bounded route and status', async t => {
  const app = await api(t);
  assert.ok(Object.isFrozen(users) && users.every(Object.isFrozen));
  await app.get('/api/v1/users/u-001?token=private');
  await app.get('/private-name?email=private');
  assert.deepEqual(app.events, [{ route: 'get', status: 200 }, { route: 'unknown', status: 404 }]);
});
