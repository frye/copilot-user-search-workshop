import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync, existsSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep } from 'node:path';

export const hash = value => createHash('sha256').update(value).digest('hex');
export const json = path => JSON.parse(readFileSync(path, 'utf8'));
export function run(command, args, cwd, options = {}) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, ...options });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} ${args[0] ?? ''} failed: ${result.error?.message ?? result.stderr ?? result.status}`);
  }
  return result.stdout;
}
export const git = (root, ...args) => run('git', args, root);
export function workspace(root) {
  const actual = realpathSync(root);
  if (realpathSync(git(actual, 'rev-parse', '--show-toplevel').trim()) !== actual) {
    throw new Error('Run at the workspace Git root, not a nested directory.');
  }
  return actual;
}
export function safePath(root, path) {
  if (typeof path !== 'string' || !path || path.includes('\\') || path.includes(':') ||
      path.split('/').some(part => !part || part === '.' || part === '..' || part === '.git') || isAbsolute(path)) {
    throw new Error(`Unsafe relative path: ${path}`);
  }
  const absolute = resolve(root, path);
  if (relative(root, absolute).startsWith(`..${sep}`)) throw new Error(`Path escapes workspace: ${path}`);
  let current = root;
  const parts = path.split('/');
  parts.forEach((part, index) => {
    current = resolve(current, part);
    try {
      const stat = lstatSync(current);
      if (stat.isSymbolicLink() || stat.nlink > 1 && stat.isFile()) throw new Error(`Links are not allowed: ${path}`);
      if (index < parts.length - 1 && !stat.isDirectory()) throw new Error(`Parent is not a directory: ${path}`);
      if (index === parts.length - 1 && !stat.isFile()) throw new Error(`Destination is not a regular file: ${path}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  });
  return absolute;
}
export function fileState(root, path) {
  const absolute = safePath(root, path);
  return existsSync(absolute) ? readFileSync(absolute) : null;
}
export function args(argv, allowed) {
  const parsed = {};
  for (let index = 0; index < argv.length; index++) {
    const key = argv[index];
    if (!allowed.includes(key) || Object.hasOwn(parsed, key)) throw new Error(`Unknown/repeated option: ${key}`);
    parsed[key] = argv[index + 1] && !argv[index + 1].startsWith('--') ? argv[++index] : true;
  }
  return parsed;
}
export function failMain(error) {
  console.error(`STOP: ${error.message}\nNo force/reset route exists. Preserve your work; preview or stage references for a manual comparison.`);
  process.exitCode = 1;
}
