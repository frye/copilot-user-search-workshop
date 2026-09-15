import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { standardsServer } from '../../src/standards-mcp/server.js';

test('real stdio initialize, exact list, both calls, strict inputs and clean close', async () => {
  const client = new Client({ name: 'protocol-test', version: '1.0.0' });
  const transport = new StdioClientTransport({ command: process.execPath, args: [resolve('dist/src/standards-mcp/main.js')], stderr: 'pipe' });
  let diagnostics = '';
  transport.stderr?.on('data', chunk => { diagnostics += String(chunk); });
  try {
    await client.connect(transport);
    assert.deepEqual(client.getServerVersion(), { name: 'workshop-standards', version: '1.0.0' });
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(tool => tool.name).sort(), ['get_api_conventions', 'get_validation_commands']);
    for (const tool of tools) {
      assert.equal(tool.annotations?.readOnlyHint, true);
      const result = await client.callTool({ name: tool.name, arguments: {} });
      assert.ok(!result.isError);
      const content = result.content as { type: string; text: string }[];
      const data = JSON.parse(content[0]!.text) as { source: string; version: string };
      assert.equal(data.version, '1.0.0');
      assert.ok(data.source.startsWith('standards/'));
    }
    assert.equal((await client.callTool({ name: 'get_api_conventions', arguments: { path: '/etc/passwd' } })).isError, true);
    assert.equal((await client.callTool({ name: 'execute_command', arguments: {} })).isError, true);
  } finally {
    await client.close();
  }
  assert.match(diagnostics, /two read-only fixture tools/);
});

test('missing and malformed fixtures fail closed, never returned as valid standards', async () => {
  await mkdir('.lab-scratch', { recursive: true });
  const root = await mkdtemp(resolve('.lab-scratch/mcp-'));
  const server = standardsServer(root);
  const client = new Client({ name: 'fixture-test', version: '1.0.0' });
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  try {
    await server.connect(serverSide);
    await client.connect(clientSide);
    assert.equal((await client.callTool({ name: 'get_api_conventions', arguments: {} })).isError, true);
    await writeFile(resolve(root, 'api-conventions.json'), '{"version":"wrong"}');
    assert.equal((await client.callTool({ name: 'get_api_conventions', arguments: {} })).isError, true);
    await writeFile(resolve(root, 'api-conventions.json'), 'not-json');
    assert.equal((await client.callTool({ name: 'get_api_conventions', arguments: {} })).isError, true);
  } finally {
    await client.close();
    await server.close();
    await rm(root, { recursive: true });
  }
});
