import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { accountTasks, assertTestEmail } from '../cypress/support/api/account-ledger.ts';

// Verificação local sem rede; nunca acessa o registro de contas reais da execução.
const temporaryRoot = mkdtempSync(join(tmpdir(), 'tcd-ledger-check-'));
try {
  const tasks = accountTasks(temporaryRoot);
  const user = { email: `qa-tcd-support-${randomUUID()}@example.com`, password: 'synthetic-only' };
  assert.throws(() => assertTestEmail('real@example.org'));
  assert.throws(() => assertTestEmail('../../outside.json'));
  assert.throws(() => tasks['accounts:assertOwned'](user));
  tasks['accounts:track'](user);
  assert.equal(tasks['accounts:pending']().length, 1);
  assert.throws(() => tasks['accounts:track'](user));
  assert.throws(() => tasks['accounts:assertOwned']({ ...user, password: 'wrong' }));
  tasks['accounts:assertOwned'](user);
  tasks['accounts:cleaned'](user);
  assert.equal(tasks['accounts:pending']().length, 0);
  tasks['accounts:cleaned'](user);
  console.log('Registro validado: namespace, caminho, ausência, colisão, credenciais, persistência e limpeza repetida.');
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
