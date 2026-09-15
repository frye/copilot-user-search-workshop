import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { args, failMain, hash, safePath, workspace } from './lib/safe.mjs';
import { workspaceKind } from './lib/examples.mjs';

function filesUnder(root, directory) {
  const absolute = dirname(safePath(root, `${directory}/.walk`));
  const visit = current => readdirSync(current, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(current, entry.name);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink() || stat.nlink > 1 && stat.isFile()) throw new Error(`Links are not allowed in ${directory}.`);
    if (entry.isDirectory()) return visit(path);
    if (!entry.isFile()) throw new Error(`Only regular files are allowed in ${directory}.`);
    return [relative(absolute, path).split('\\').join('/')];
  });
  return visit(absolute).sort();
}

function packet(root) {
  const sourceRoot = 'workshop/spec-kit-reference';
  return filesUnder(root, sourceRoot).map(path => {
    const data = readFileSync(safePath(root, `${sourceRoot}/${path}`));
    return {
      path,
      sha256: hash(data),
      data,
      destination: `workshop/artifacts/spec-kit-reference/${path}`,
    };
  });
}

function directoryPath(root, directory) {
  return dirname(safePath(root, `${directory}/.directory`));
}

function describe(root, entries) {
  return {
    source: 'workshop/spec-kit-reference',
    destination: 'workshop/artifacts/spec-kit-reference',
    workspace: workspaceKind(root),
    files: entries.map(entry => ({
      path: entry.path,
      sha256: entry.sha256,
      state: existsSync(safePath(root, entry.destination)) ? 'collision' : 'missing',
    })),
    note: 'Reference artifacts are not evidence that the learner ran Spec Kit.',
  };
}

function copyEntries(root, entries, prefix) {
  const createdFiles = [];
  const createdDirs = [];
  try {
    for (const entry of entries) {
      const target = safePath(root, `${prefix}/${entry.path}`);
      if (existsSync(target)) throw new Error(`Destination already exists: ${relative(root, target)}`);
      const missing = [];
      let parent = dirname(target);
      while (!existsSync(parent)) {
        missing.push(parent);
        parent = dirname(parent);
      }
      for (const directory of missing.reverse()) {
        mkdirSync(directory);
        createdDirs.push(directory);
      }
      writeFileSync(target, entry.data, { flag: 'wx' });
      createdFiles.push(target);
    }
  } catch (error) {
    for (const file of createdFiles.reverse()) {
      try { unlinkSync(file); } catch { /* Preserve unexpected concurrent changes. */ }
    }
    for (const directory of createdDirs.reverse()) {
      try { rmdirSync(directory); } catch { /* Preserve unexpected concurrent content. */ }
    }
    throw error;
  }
}

try {
  const options = args(process.argv.slice(2), ['--preview', '--stage', '--apply']);
  const selected = ['--preview', '--stage', '--apply'].filter(option => options[option]);
  if (selected.length !== 1) throw new Error('Choose exactly one of --preview, --stage, or --apply.');
  const root = workspace(process.cwd());
  if (workspaceKind(root) !== 'consumer') throw new Error('Run the Lab 09 artifact workflow in the consumer workspace.');
  const entries = packet(root);
  if (!entries.length) throw new Error('The bundled Spec Kit reference packet is missing.');

  if (options['--preview']) {
    console.log(JSON.stringify(describe(root, entries), null, 2));
  } else if (options['--stage']) {
    const prefix = '.lab-references/09-spec-kit-reference';
    if (existsSync(directoryPath(root, prefix))) throw new Error(`${prefix} already exists.`);
    copyEntries(root, entries, prefix);
    console.log(`Staged ${entries.length} reference files at ${prefix}.`);
  } else {
    if (entries.some(entry => existsSync(safePath(root, entry.destination)))) {
      throw new Error('Reference destination collision. Preserve learner work and use --stage for comparison.');
    }
    copyEntries(root, entries, 'workshop/artifacts/spec-kit-reference');
    console.log(`Applied ${entries.length} reference files to workshop/artifacts/spec-kit-reference.`);
  }
} catch (error) {
  failMain(error);
}
