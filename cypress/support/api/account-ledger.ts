import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { TestUser } from '../types/test-data';

interface RecordEntry { user: TestUser; state: 'tracked' | 'cleaned'; updatedAt: string }

// Somente contas sintéticas deste projeto podem entrar no registro de limpeza.
export function assertTestEmail(email: string): void {
  if (!/^qa-tcd-(?:tc(?:01|02|03|04|05|08|09|10|15|16)|support)-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}@example\.com$/.test(email)) {
    throw new Error('Conta não pertence ao namespace descartável do projeto');
  }
}

export function accountTasks(projectRoot: string) {
  const directory = join(projectRoot, 'artifacts', 'accounts');
  const pathFor = (email: string) => { assertTestEmail(email); return join(directory, `${email}.json`); };
  const read = (email: string): RecordEntry => JSON.parse(readFileSync(pathFor(email), 'utf8'));
  const owned = (user: TestUser) => {
    const record = read(user.email);
    if (record.user.email !== user.email || record.user.password !== user.password) {
      throw new Error('Credenciais não correspondem ao registro local da conta temporária');
    }
    return record;
  };
  return {
    'accounts:track'(user: TestUser) {
      const path = pathFor(user.email);
      mkdirSync(directory, { recursive: true });
      // Não sobrescrever identidade anterior: colisões precisam falhar explicitamente.
      writeFileSync(path, JSON.stringify({ user, state: 'tracked', updatedAt: new Date().toISOString() }, null, 2), { flag: 'wx', mode: 0o600 });
      return null;
    },
    'accounts:assertOwned'(user: TestUser) { owned(user); return null; },
    'accounts:cleaned'(user: TestUser) {
      const record = owned(user);
      writeFileSync(pathFor(user.email), JSON.stringify({ ...record, state: 'cleaned', updatedAt: new Date().toISOString() }, null, 2), { mode: 0o600 });
      return null;
    },
    'accounts:pending'(): TestUser[] {
      mkdirSync(directory, { recursive: true });
      return readdirSync(directory).filter((file) => file.endsWith('.json'))
        .map((file) => read(file.slice(0, -5)))
        .filter((record) => record.state === 'tracked').map((record) => record.user);
    },
  };
}
