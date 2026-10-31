import type { CartItem } from '../types/test-data';

export const productSelectors = {
  cards: '.features_items .product-image-wrapper', info: '.productinfo',
  details: '.product-information', search: '#search_product', searchButton: '#submit_search',
};

export function parsePrice(text: string): number {
  const match = /^Rs\.\s*(\d+(?:\.\d+)?)$/.exec(text.trim());
  if (!match) throw new Error(`Preço inesperado: ${text}`);
  return Number(match[1]);
}

export function readFirstProducts(count: number): Cypress.Chainable<CartItem[]> {
  if (!Number.isInteger(count) || count < 1) throw new Error('Quantidade de produtos inválida');
  return cy.get(productSelectors.cards).should('have.length.at.least', count).then(($cards) => {
    const items = $cards.toArray().slice(0, count).map((card) => {
      const info = Cypress.$(card).find(productSelectors.info);
      const id = info.find('a[data-product-id]').attr('data-product-id');
      if (!id || !/^\d+$/.test(id)) throw new Error('Produto sem identificador numérico');
      const name = info.find('p').text().trim();
      expect(name, 'nome do produto').not.to.eq('');
      return { id, name, price: parsePrice(info.find('h2').text()), quantity: 1 };
    });
    expect(new Set(items.map((item) => item.id)).size, 'produtos distintos').to.eq(count);
    return items;
  });
}

export function addProducts(items: CartItem[]) {
  items.forEach((item) => {
    expect(item.quantity, 'adição unitária por produto').to.eq(1);
    cy.get(`.features_items .productinfo a[data-product-id="${item.id}"]`).scrollIntoView().should('be.visible').click();
    cy.get('#cartModal').should('be.visible');
    cy.contains('#cartModal button', 'Continue Shopping').click();
    cy.get('#cartModal').should('not.be.visible');
  });
}

export function searchProducts(term: string) {
  cy.get(productSelectors.search).should('be.visible').clear().type(term);
  return cy.get(productSelectors.searchButton).click();
}
