import { cleanupAccount, createAccount, getAccount, trackNewAccount } from '../support/api/accounts';
import { createUser } from '../support/factories/user.factory';
import { accountSelectors, assertLoggedIn, beginSignup, deleteAccountViaUi, fillAccountForm, login } from '../support/flows/account';
import { openHome, navigateTo } from '../support/flows/navigation';
import { addProducts, productSelectors, readFirstProducts, searchProducts } from '../support/flows/products';
import { assertCartItems } from '../support/flows/cart';
import { assertCheckout, fillPayment, placeOrder } from '../support/flows/checkout';
import type { PaymentData, TestUser } from '../support/types/test-data';

describe('Fase 3 — integração dos módulos de interface', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('SUPPORT'); });
  afterEach(() => {
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
      if (pending.some((entry) => entry.email === user.email)) return cleanupAccount(user);
    });
  });

  it('preenche cadastro completo e valida exclusão UI com limpeza idempotente', () => {
    trackNewAccount(user);
    openHome();
    navigateTo('login');
    beginSignup(user);
    fillAccountForm(user);
    cy.get('[data-qa="create-account"]').click();
    cy.get(accountSelectors.created).should('be.visible');
    cy.get(accountSelectors.continue).click();
    assertLoggedIn(user);
    deleteAccountViaUi();
    cy.get(accountSelectors.continue).click();
    cleanupAccount(user);
    getAccount(user.email).should('eq', null);
  });

  it('usa conta da API no login, carrinho, checkout e preenchimento de pagamento', () => {
    createAccount(user);
    openHome();
    navigateTo('login');
    login(user);
    assertLoggedIn(user);
    readFirstProducts(2).then((items) => {
      addProducts(items);
      navigateTo('view_cart');
      cy.location('pathname').should('eq', '/view_cart');
      assertCartItems(items);
      cy.contains('a', 'Proceed To Checkout').click();
      cy.location('pathname').should('eq', '/checkout');
      cy.document().then((doc) => cy.writeFile('artifacts/phase3/checkout-tables.html',
        Array.from(doc.querySelectorAll('table')).map((table) => table.outerHTML).join('\n')));
      assertCheckout(user, items);
      cy.screenshot('phase3-checkout', { capture: 'viewport' });
      placeOrder('Validacao dos modulos de suporte - dados ficticios');
      cy.location('pathname').should('eq', '/payment');
      cy.fixture<PaymentData>('payment').then((payment) => fillPayment(payment));
      cy.screenshot('phase3-payment-filled', { capture: 'viewport' });
      // A compra e sua confirmação pertencem aos cenários da Fase 4.
    });
  });

  it('lê catálogo, detalhes e busca pelos módulos compartilhados', () => {
    openHome();
    navigateTo('products');
    cy.location('pathname').should('eq', '/products');
    readFirstProducts(1).then(([item]) => {
      cy.get(`${productSelectors.cards} a[href="/product_details/${item.id}"]`).click();
      cy.get(productSelectors.details).should('be.visible').and('contain.text', item.name);
    });
    navigateTo('products');
    searchProducts('Blue Top');
    cy.contains('h2', 'Searched Products', { matchCase: false }).should('be.visible');
    cy.get(`${productSelectors.cards} .productinfo p`).should('have.length.at.least', 1).each(($name) => {
      expect($name.text().toLowerCase()).to.include('blue top');
    });
  });
});
