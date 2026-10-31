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
    // Passos 1–3: home.
    openHome();
    // Passos 4–6: autenticação UI e identidade.
    navigateTo('login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    login(user);
    assertLoggedIn(user);
    // Passos 7–9: produtos, carrinho e seus dados.
    readFirstProducts(2).then((items) => {
      addProducts(items);
      navigateTo('view_cart');
      cy.location('pathname').should('eq', '/view_cart');
      assertCartItems(items);
      // Passos 10–11: checkout, endereços e resumo.
      cy.contains('a', 'Proceed To Checkout').click();
      cy.location('pathname').should('eq', '/checkout');
      assertCheckout(user, items);
      cy.screenshot('tc16-checkout');
      // Passos 12: observação e avanço.
      placeOrder('Pedido TC16 - somente dados ficticios');
      cy.location('pathname').should('eq', '/payment');
      // Passos 13: dados de pagamento fictícios.
      cy.fixture<PaymentData>('payment').then(fillPayment);
      // Passos 14–15: envio, mensagem transitória e confirmação final.
      confirmPayment();
      cy.screenshot('tc16-pedido-confirmado');
    });
    // Passos 16–17: exclusão UI e finalização.
    deleteAccountViaUi();
    cy.screenshot('tc16-conta-excluida');
    cy.get(accountSelectors.continue).click();
    cy.location('pathname').should('eq', '/');
    getAccount(user.email).should('eq', null);
  });
});
