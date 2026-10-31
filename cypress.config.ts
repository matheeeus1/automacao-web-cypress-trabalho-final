import { randomUUID } from 'node:crypto';
import { defineConfig } from 'cypress';
import { accountTasks } from './cypress/support/api/account-ledger';

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
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: `${artifacts}/reports`,
    reportFilename: 'index',
    reportPageTitle: 'Automação Web — Trabalho Final',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    ignoreVideos: true,
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/trabalho-final/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    testIsolation: true,
    setupNodeEvents(on, config) {
      on('task', accountTasks(config.projectRoot));
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
