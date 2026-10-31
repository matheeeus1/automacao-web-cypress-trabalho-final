import { cleanupTrackedAccount, createAccount, getAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { assertLoggedIn, deleteAccountViaUi, login } from '../../support/flows/account';
import { navigateTo, openHome } from '../../support/flows/navigation';
import type { TestUser } from '../../support/types/test-data';

describe('Login válido', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('TC02'); createAccount(user); });
  afterEach(() => cleanupTrackedAccount(user));

  it('TC02 — autentica com credenciais válidas e exclui a conta', () => {
    openHome();
    navigateTo('login');
    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    login(user);
    assertLoggedIn(user);
    cy.screenshot('tc02-autenticado');
    deleteAccountViaUi();
    cy.screenshot('tc02-excluido');
    getAccount(user.email).should('eq', null);
  });
});
