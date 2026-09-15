import assert from 'node:assert/strict';
import { faultyWindow } from './total-after-limit.mjs';

const result = faultyWindow([{ id: 'u-001' }, { id: 'u-002' }, { id: 'u-003' }], 1);
assert.equal(result.items.length, 1);
assert.equal(result.total, 1);
assert.notEqual(result.total, 3);
console.log('DELIBERATE DEFECT DETECTED: total is 1 after limiting; approved contract requires 3. This probe is not API acceptance.');
