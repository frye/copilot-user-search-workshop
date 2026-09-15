import { fileURLToPath } from 'node:url';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { standardsServer } from './server.js';

const root = fileURLToPath(new URL('../../../standards/', import.meta.url));
console.error('workshop-standards 1.0.0: two read-only fixture tools');
await standardsServer(root).connect(new StdioServerTransport());
