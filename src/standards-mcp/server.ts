import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const common = {
  source: z.string(),
  version: z.literal('1.0.0'),
  kind: z.literal('synthetic-workshop-fixture'),
};
const conventions = z.object({ ...common, source: z.literal('standards/api-conventions.json'), requirements: z.array(z.string()).min(1) }).strict();
const commands = z.object({ ...common, source: z.literal('standards/validation-commands.json'), commands: z.object({
  starter: z.string(), regression: z.string(), acceptance: z.string(), solution: z.string(), customizations: z.string(),
}).strict() }).strict();

export function standardsServer(root: string) {
  const server = new McpServer({ name: 'workshop-standards', version: '1.0.0' });
  for (const [name, filename, schema] of [
    ['get_api_conventions', 'api-conventions.json', conventions],
    ['get_validation_commands', 'validation-commands.json', commands],
  ] as const) {
    server.registerTool(name, {
      description: `Read only the synthetic standards/${filename} fixture; no arguments, arbitrary paths, network, or execution.`,
      inputSchema: z.object({}).strict(),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    }, async () => {
      try {
        const data = schema.parse(JSON.parse(await readFile(resolve(root, filename), 'utf8')));
        return { content: [{ type: 'text' as const, text: JSON.stringify(data) }] };
      } catch {
        console.error(`Fixture unavailable or invalid: ${filename}`);
        return { isError: true, content: [{ type: 'text' as const, text: 'Fixture unavailable or invalid; inspect the checked-in standards files.' }] };
      }
    });
  }
  return server;
}
