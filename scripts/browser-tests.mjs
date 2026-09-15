import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

if (process.argv.length > 3 || process.argv[2] && process.argv[2] !== '--install') throw new Error('Only --install is supported.');
mkdirSync('.lab-scratch', { recursive: true });
const scratch = mkdtempSync(resolve('.lab-scratch/browser-'));
try {
  const args = process.argv[2] ? ['install', 'chromium'] : ['test'];
  const result = spawnSync(process.execPath, [resolve('node_modules/@playwright/test/cli.js'), ...args], {
    cwd: process.cwd(), stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: '0', TMPDIR: scratch, TMP: scratch, TEMP: scratch },
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(scratch, { recursive: true });
}
