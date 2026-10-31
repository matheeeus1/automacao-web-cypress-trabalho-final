import { cleanupAccount, getAccount, trackNewAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import {
  accountSelectors, assertLoggedIn, beginSignup, deleteAccountViaUi, fillAccountForm,
} from '../../support/flows/account';
import { navigateTo, openHome } from '../../support/flows/navigation';
import type { TestUser } from '../../support/types/test-data';

describe('Cadastro de usuário', () => {
  let user: TestUser;

  beforeEach(() => {
    user = createUser('TC01');
    trackNewAccount(user);
  });

  afterEach(() => {
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
      if (pending.some((entry) => entry.email === user.email)) return cleanupAccount(user);
    });
  });

  it('TC01 — cadastra usuário completo, confirma autenticação e exclui a conta', () => {
    openHome();

    navigateTo('login');
    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'New User Signup!').should('be.visible');

    beginSignup(user);

    fillAccountForm(user);
    cy.get('[data-qa="password"]').should('have.value', user.password);
    cy.get('[data-qa="days"]').should('have.value', user.birth.day);
    cy.get('[data-qa="months"]').should('have.value', user.birth.month);
    cy.get('[data-qa="years"]').should('have.value', user.birth.year);
    cy.screenshot('tc01-formulario-completo', { capture: 'fullPage' });

    cy.get('[data-qa="create-account"]').click();
    cy.get(accountSelectors.created).should('be.visible').and('contain.text', 'Account Created!');
    cy.screenshot('tc01-conta-criada', { capture: 'viewport' });

    cy.get(accountSelectors.continue).click();
    cy.location('pathname').should('eq', '/');
    assertLoggedIn(user);
    cy.screenshot('tc01-usuario-autenticado', { capture: 'viewport' });

    deleteAccountViaUi();
    cy.screenshot('tc01-conta-excluida', { capture: 'viewport' });
    cy.get(accountSelectors.continue).click();
    cy.location('pathname').should('eq', '/');
    cy.get('header a[href="/login"]').should('be.visible');
    cy.contains('header a', 'Logged in as').should('not.exist');

    getAccount(user.email).should('eq', null);
  });
});
