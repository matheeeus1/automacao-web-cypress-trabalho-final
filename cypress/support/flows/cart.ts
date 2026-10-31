import type { CartItem } from '../types/test-data';
import { parsePrice } from './products';

export const cartTableSelector = 'table:has(tr[id^="product-"])';

export function assertCartItems(items: CartItem[]) {
  cy.get(cartTableSelector).should('have.length', 1);
  cy.get(`${cartTableSelector} tbody tr[id^="product-"]`).should('have.length', items.length);
  items.forEach((item) => {
    cy.get(`#product-${item.id}`).should('be.visible').within(() => {
      cy.get('.cart_description a').should('have.text', item.name);
      cy.get('.cart_price p').should(($price) => expect(parsePrice($price.text())).to.eq(item.price));
      cy.get('.cart_quantity').should(($quantity) => expect(Number($quantity.text().trim())).to.eq(item.quantity));
      cy.get('.cart_total_price').should(($total) => expect(parsePrice($total.text())).to.eq(item.price * item.quantity));
    });
  });
}
