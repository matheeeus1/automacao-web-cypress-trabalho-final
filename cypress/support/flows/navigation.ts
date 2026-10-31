export function openHome() {
  cy.visit('/');
  cy.location('pathname').should('eq', '/');
  cy.get('header').should('be.visible');
  return cy.get('#slider-carousel').should('be.visible');
}

export function navigateTo(destination: 'login' | 'products' | 'view_cart') {
  return cy.get(`header a[href="/${destination}"]`).should('be.visible').click();
}
