import { navigateTo, openHome } from '../../support/flows/navigation';
import { parsePrice, productSelectors, readFirstProducts } from '../../support/flows/products';

describe('Catálogo e detalhes', () => {
  it('TC08 — exibe catálogo e os seis dados do primeiro produto', () => {
    // Passos 1–3: home.
    openHome();
    // Passos 4–6: catálogo real visível e não vazio.
    navigateTo('products');
    cy.location('pathname').should('eq', '/products');
    cy.contains('h2', 'All Products', { matchCase: false }).should('be.visible');
    cy.get(productSelectors.cards).should('have.length.at.least', 1).first().should('be.visible');
    readFirstProducts(1).then(([item]) => {
      // Passos 7–8: detalhes do primeiro item, identificado pelo catálogo.
      cy.get(`${productSelectors.cards} a[href="/product_details/${item.id}"]`).click();
      cy.location('pathname').should('eq', `/product_details/${item.id}`);
      // Passos 9: nome, categoria, preço, disponibilidade, condição e marca.
      cy.get(productSelectors.details).should('be.visible').within(() => {
        cy.get('h2').should('be.visible').and('have.text', item.name);
        cy.contains('span', /^Rs\./).should('be.visible').and(($price) => {
          expect(parsePrice($price.text())).to.eq(item.price);
        });
        ['Category', 'Availability', 'Condition', 'Brand'].forEach((label) => {
          cy.contains('p', new RegExp(`${label}:`)).should('be.visible').and(($field) => {
            expect($field.text().split(':').slice(1).join(':').trim(), label).not.to.eq('');
          });
        });
      });
      cy.screenshot('tc08-detalhes');
    });
  });
});
