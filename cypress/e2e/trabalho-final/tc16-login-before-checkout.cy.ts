import { cleanupTrackedAccount, createAccount, getAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { accountSelectors, assertLoggedIn, deleteAccountViaUi, login } from '../../support/flows/account';
import { assertCartItems } from '../../support/flows/cart';
import { assertCheckout, confirmPayment, fillPayment, placeOrder } from '../../support/flows/checkout';
import { navigateTo, openHome } from '../../support/flows/navigation';
import { addProducts, readFirstProducts } from '../../support/flows/products';
import type { PaymentData, TestUser } from '../../support/types/test-data';

describe('Login antes do checkout', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('TC16'); createAccount(user); });
  afterEach(() => cleanupTrackedAccount(user));

  it('TC16 — autentica antes da compra, confirma pedido e exclui a conta', () => {
    openHome();
    navigateTo('login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    login(user);
    assertLoggedIn(user);
    readFirstProducts(2).then((items) => {
      addProducts(items);
      navigateTo('view_cart');
      cy.location('pathname').should('eq', '/view_cart');
      assertCartItems(items);
      cy.contains('a', 'Proceed To Checkout').click();
      cy.location('pathname').should('eq', '/checkout');
      assertCheckout(user, items);
      cy.screenshot('tc16-checkout');
      placeOrder('Pedido TC16 - somente dados ficticios');
      cy.location('pathname').should('eq', '/payment');
      cy.fixture<PaymentData>('payment').then(fillPayment);
      confirmPayment();
      cy.screenshot('tc16-pedido-confirmado');
    });
    deleteAccountViaUi();
    cy.screenshot('tc16-conta-excluida');
    cy.get(accountSelectors.continue).click();
    cy.location('pathname').should('eq', '/');
    getAccount(user.email).should('eq', null);
  });
});
