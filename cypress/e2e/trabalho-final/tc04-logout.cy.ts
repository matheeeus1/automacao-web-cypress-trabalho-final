import { cleanupTrackedAccount, createAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { assertLoggedIn, login } from '../../support/flows/account';
import { navigateTo, openHome } from '../../support/flows/navigation';
import type { TestUser } from '../../support/types/test-data';

describe('Logout', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('TC04'); createAccount(user); });
  afterEach(() => cleanupTrackedAccount(user));
  it('TC04 — encerra a sessão e retorna ao login', () => {
    openHome();
    navigateTo('login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    login(user);
    assertLoggedIn(user);
    cy.get('header a[href="/logout"]').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').should('be.visible');
    cy.contains('header a', 'Logged in as').should('not.exist');
    cy.get('header a[href="/logout"]').should('not.exist');
    cy.screenshot('tc04-logout');
  });
});
