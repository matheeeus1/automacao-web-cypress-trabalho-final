import type { CartItem, PaymentData, TestUser } from '../types/test-data';
import { assertCartItems, cartTableSelector } from './cart';
import { parsePrice } from './products';

export function assertCheckout(user: TestUser, items: CartItem[]) {
  const a = user.address;
  const expectedLines = [`${user.title}. ${a.firstName} ${a.lastName}`, a.company, a.address1,
    a.address2, `${a.city} ${a.state} ${a.zipcode}`, a.country, a.mobileNumber];
  ['#address_delivery', '#address_invoice'].forEach((selector) => {
    cy.get(selector).should('be.visible').find('li').should(($lines) => {
      const lines = $lines.toArray().map((line) => line.textContent!.replace(/\s+/g, ' ').trim());
      expectedLines.forEach((line) => expect(lines, `endereço ${selector}`).to.include(line));
    });
  });
  assertCartItems(items);
  return cy.contains(`${cartTableSelector} tr`, 'Total Amount').find('.cart_total_price').should(($total) => {
    expect(parsePrice($total.text())).to.eq(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  });
}

export function placeOrder(comment: string) {
  cy.get('textarea[name="message"]').should('be.visible').type(comment).should('have.value', comment);
  return cy.contains('a', 'Place Order').click();
}

export function fillPayment(payment: PaymentData) {
  const fields = { name_on_card: payment.name, card_number: payment.number, cvc: payment.cvc,
    expiry_month: payment.month, expiry_year: payment.year };
  Object.entries(fields).forEach(([name, value]) => {
    cy.get(`input[name="${name}"]`).should('be.visible').type(value).should('have.value', value);
  });
}
