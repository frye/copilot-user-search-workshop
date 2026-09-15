import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync, lstatSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { fileState, git, hash, json, safePath } from './safe.mjs';

const skillFiles = ['SKILL.md', 'references/review-checklist.md'];
export function validateSkill(root) {
  const base = '.github/skills/api-change-workflow';
  const skill = fileState(root, `${base}/SKILL.md`);
  if (!skill) throw new Error('Author the canonical skill in Lab 03 first.');
  const text = skill.toString();
  if (!/^---\r?\nname: api-change-workflow\r?\ndescription: .+\r?\n---\r?\n/.test(text)) throw new Error('Skill needs name and single-line description frontmatter.');
  for (const fragment of ['references/review-checklist.md', 'approval', 'evidence']) {
    if (!text.toLowerCase().includes(fragment)) throw new Error(`Skill missing required boundary/reference: ${fragment}`);
  }
  const walk = (dir, prefix = '') => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw new Error('Skill source contains a symlink.');
    return entry.isDirectory() ? walk(resolve(dir, entry.name), `${prefix}${entry.name}/`) : [`${prefix}${entry.name}`];
  });
  const found = walk(resolve(root, base)).sort();
  if (JSON.stringify(found) !== JSON.stringify([...skillFiles].sort())) throw new Error('Skill-only package allowlist is SKILL.md and references/review-checklist.md; no hidden executables or unrelated files.');
  return skillFiles.map(file => {
    const data = fileState(root, `${base}/${file}`);
    if (!data || !data.length) throw new Error(`Missing/empty reference: ${file}`);
    return { source: `${base}/${file}`, destination: `skills/api-change-workflow/${file}`, data, sha256: hash(data) };
  });
}

export function packageToolkit(root) {
  const manifestPath = safePath(root, 'toolkit/plugin.json');
  const manifest = json(manifestPath);
  const schema = json(resolve(root, 'workshop/plugin.schema.json'));
  const validate = new Ajv2020({ strict: true }).compile(schema);
  if (!validate(manifest)) throw new Error(`Agent Plugins 1.0 schema: ${JSON.stringify(validate.errors)}`);
  if (manifest.name !== 'user-search-toolkit' || !/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('Use user-search-toolkit and an explicit x.y.z version.');
  if (manifest.extensions) throw new Error('Core package is skill-only; client extensions are outside this lab.');
  const files = validateSkill(root);
  files.unshift({ source: 'toolkit/plugin.json', destination: 'plugin.json', data: readFileSync(manifestPath), sha256: hash(readFileSync(manifestPath)) });
  const sourceChecksum = hash(JSON.stringify(files.map(({ destination, sha256 }) => ({ destination, sha256 }))));
  const output = `toolkit/dist/${manifest.name}-${manifest.version}`;
  safePath(root, `${output}/provenance.json`);
  const folder = resolve(root, output);
  if (existsSync(folder)) {
    const evidence = json(safePath(root, `${output}/provenance.json`));
    if (evidence.sourceChecksum !== sourceChecksum) throw new Error('Version already built with different content. Bump plugin.json version; never overwrite an installed version.');
    verifyPackage(folder);
    return { output, ...evidence, unchanged: true };
  }
  mkdirSync(folder, { recursive: true });
  try {
    for (const file of files) {
      const target = safePath(folder, file.destination);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, file.data, { flag: 'wx' });
    }
    const provenance = {
      schema: 1, name: manifest.name, version: manifest.version, sourceCommit: git(root, 'rev-parse', 'HEAD').trim(),
      sourceDirty: Boolean(git(root, 'status', '--porcelain', '--', 'toolkit/plugin.json', '.github/skills/api-change-workflow').trim()),
      sourceChecksum, files: files.map(({ source, destination, sha256 }) => ({ source, destination, sha256 })),
    };
    writeFileSync(resolve(folder, 'provenance.json'), JSON.stringify(provenance, null, 2) + '\n', { flag: 'wx' });
    return { output, ...provenance, unchanged: false };
  } catch (error) {
    rmSync(folder, { recursive: true });
    throw error;
  }
}

export function verifyPackage(folder) {
  const provenance = json(safePath(folder, 'provenance.json'));
  const expected = ['plugin.json', 'skills/api-change-workflow/SKILL.md', 'skills/api-change-workflow/references/review-checklist.md'];
  if (JSON.stringify(provenance.files.map(file => file.destination)) !== JSON.stringify(expected)) throw new Error('Unexpected package file allowlist.');
  for (const file of provenance.files) {
    const data = fileState(folder, file.destination);
    if (!data || hash(data) !== file.sha256) throw new Error(`Package checksum mismatch: ${file.destination}`);
  }
  if (hash(JSON.stringify(provenance.files.map(({ destination, sha256 }) => ({ destination, sha256 })))) !== provenance.sourceChecksum) throw new Error('Package aggregate checksum mismatch.');
  const walk = (dir, prefix = '') => readdirSync(dir).flatMap(name => {
    const path = resolve(dir, name);
    if (lstatSync(path).isSymbolicLink()) throw new Error('Package symlink rejected.');
    return lstatSync(path).isDirectory() ? walk(path, `${prefix}${name}/`) : [`${prefix}${name}`];
  });
  if (JSON.stringify(walk(folder).sort()) !== JSON.stringify([...expected, 'provenance.json'].sort())) throw new Error('Unexpected package content.');
  return provenance;
}
