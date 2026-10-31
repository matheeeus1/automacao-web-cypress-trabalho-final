import { navigateTo, openHome } from '../../support/flows/navigation';
import { productSelectors, searchProducts } from '../../support/flows/products';

describe('Pesquisa de produtos', () => {
  it('TC09 — encontra todos os itens relacionados ao termo pesquisado', () => {
    const term = 'Blue Top';
    openHome();
    navigateTo('products');
    cy.location('pathname').should('eq', '/products');
    cy.contains('h2', 'All Products', { matchCase: false }).should('be.visible');
    cy.get(productSelectors.cards).then(($cards) => {
      const expectedIds = $cards.toArray().filter((card) =>
        Cypress.$(card).find('.productinfo p').text().toLowerCase().includes(term.toLowerCase()),
      ).map((card) => Cypress.$(card).find('.productinfo [data-product-id]').attr('data-product-id')).sort();
      expect(expectedIds, 'produto conhecido no catálogo').not.to.be.empty;
      searchProducts(term);
      cy.contains('h2', 'Searched Products', { matchCase: false }).should('be.visible');
      cy.get(productSelectors.cards).should('have.length', expectedIds.length).should(($results) => {
        const ids = $results.toArray().map((card) => Cypress.$(card).find('.productinfo [data-product-id]').attr('data-product-id')).sort();
        expect(ids).to.deep.eq(expectedIds);
      }).each(($card) => {
        cy.wrap($card).scrollIntoView().should('be.visible');
        cy.wrap($card).find('.productinfo p').should('be.visible').and(($name) => {
          expect($name.text().toLowerCase()).to.include(term.toLowerCase());
        });
      });
      cy.screenshot('tc09-resultados');
    });
  });
});
