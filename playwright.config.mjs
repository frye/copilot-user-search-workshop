import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173/copilot-user-search-workshop/', headless: true },
  webServer: {
    command: 'npm run docs:preview -- --port 4173',
    url: 'http://127.0.0.1:4173/copilot-user-search-workshop/',
    reuseExistingServer: false,
    timeout: 30000,
  },
});
