import { createUser } from '../../support/factories/user.factory';
import { openHome } from '../../support/flows/navigation';

describe('Assinatura na página inicial', () => {
  it('TC10 — confirma inscrição com e-mail fictício exclusivo', () => {
    const { email } = createUser('TC10');
    openHome();
    cy.get('footer').scrollIntoView();
    cy.contains('footer h2', 'Subscription', { matchCase: false }).should('be.visible');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
    cy.screenshot('tc10-assinatura-confirmada');
  });
});
