import { cleanupAccount } from '../support/api/accounts';
import type { TestUser } from '../support/types/test-data';

// Execução manual: usar somente sem outras execuções ativas deste projeto.
describe('Recuperação explícita de contas temporárias registradas', () => {
  it('limpa contas pendentes no registro local', () => {
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
      pending.forEach((user) => cleanupAccount(user));
    });
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).should('have.length', 0);
  });
});
