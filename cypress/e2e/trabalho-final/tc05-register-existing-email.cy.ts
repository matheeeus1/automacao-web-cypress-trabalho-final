import { cleanupTrackedAccount, createAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { beginSignup } from '../../support/flows/account';
import { navigateTo, openHome } from '../../support/flows/navigation';
import type { TestUser } from '../../support/types/test-data';

describe('Cadastro com e-mail existente', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('TC05'); createAccount(user); });
  afterEach(() => cleanupTrackedAccount(user));
  it('TC05 — rejeita cadastro com e-mail previamente registrado', () => {
    // Passos 1–3: home.
    openHome();
    // Passos 4–5: cadastro inicial.
    navigateTo('login');
    cy.contains('h2', 'New User Signup!').should('be.visible');
    // Passos 6–7: nome e e-mail existente, envio.
    beginSignup(user);
    // Passos 8: erro de duplicidade e ausência de avanço.
    cy.contains('form[action="/signup"] p', 'Email Address already exist!').should('be.visible');
    cy.get('[data-qa="create-account"]').should('not.exist');
    cy.contains('header a', 'Logged in as').should('not.exist');
    cy.screenshot('tc05-email-existente');
  });
});
