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
    // Passos 1–3: executor, acesso e home.
    openHome();
    // Passos 4–5: formulário de login.
    navigateTo('login');
    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    // Passos 6–8: credenciais, envio e identidade autenticada.
    login(user);
    assertLoggedIn(user);
    cy.screenshot('tc02-autenticado');
    // Passos 9–10: exclusão UI e confirmação.
    deleteAccountViaUi();
    cy.screenshot('tc02-excluido');
    getAccount(user.email).should('eq', null);
  });
});
