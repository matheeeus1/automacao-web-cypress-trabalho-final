import { randomUUID } from 'node:crypto';
import { defineConfig } from 'cypress';

// Cada inicialização preserva suas próprias evidências, sem sobrescrever runs anteriores.
const runId = process.env.E2E_RUN_ID ?? `${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}`;
if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(runId)) throw new Error('E2E_RUN_ID inválido');
const artifacts = `artifacts/${runId}`;

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 900,
  retries: 0,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: `${artifacts}/screenshots`,
  videosFolder: `${artifacts}/videos`,
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/trabalho-final/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    testIsolation: true,
  },
});
