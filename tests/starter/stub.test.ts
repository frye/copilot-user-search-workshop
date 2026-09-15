import { test } from 'node:test';
import assert from 'node:assert/strict';
import { api } from '../http.js';

test('starter search is deliberately unimplemented, including invalid queries', async t => {
  const app = await api(t);
  for (const query of ['', '?q=lee&limit=1', '?limit=0']) {
    const response = await app.get('/api/v1/users/search' + query);
    assert.equal(response.status, 501);
    assert.deepEqual(response.body, { error: { code: 'NOT_IMPLEMENTED', message: 'Search is the workshop exercise.' } });
  }
});
