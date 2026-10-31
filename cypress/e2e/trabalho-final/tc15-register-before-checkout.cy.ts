import { cleanupTrackedAccount, getAccount, trackNewAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { accountSelectors, assertLoggedIn, beginSignup, deleteAccountViaUi, fillAccountForm } from '../../support/flows/account';
import { assertCartItems } from '../../support/flows/cart';
import { assertCheckout, confirmPayment, fillPayment, placeOrder } from '../../support/flows/checkout';
import { navigateTo, openHome } from '../../support/flows/navigation';
import { addProducts, readFirstProducts } from '../../support/flows/products';
import type { PaymentData, TestUser } from '../../support/types/test-data';

describe('Cadastro antes do checkout', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('TC15'); trackNewAccount(user); });
  afterEach(() => cleanupTrackedAccount(user));

  it('TC15 — cadastra antes da compra, confirma pedido e exclui a conta', () => {
    openHome();
    navigateTo('login');
    cy.contains('h2', 'New User Signup!').should('be.visible');
    beginSignup(user);
    fillAccountForm(user);
    cy.get('[data-qa="create-account"]').click();
    cy.get(accountSelectors.created).should('be.visible').and('contain.text', 'Account Created!');
    cy.get(accountSelectors.continue).click();
    assertLoggedIn(user);
    readFirstProducts(2).then((items) => {
      addProducts(items);
      navigateTo('view_cart');
      cy.location('pathname').should('eq', '/view_cart');
      assertCartItems(items);
      cy.contains('a', 'Proceed To Checkout').click();
      cy.location('pathname').should('eq', '/checkout');
      assertCheckout(user, items);
      cy.screenshot('tc15-checkout');
      placeOrder('Pedido TC15 - somente dados ficticios');
      cy.location('pathname').should('eq', '/payment');
      cy.fixture<PaymentData>('payment').then(fillPayment);
      confirmPayment();
      cy.screenshot('tc15-pedido-confirmado');
    });
    deleteAccountViaUi();
    cy.screenshot('tc15-conta-excluida');
    cy.get(accountSelectors.continue).click();
    cy.location('pathname').should('eq', '/');
    getAccount(user.email).should('eq', null);
  });
});
