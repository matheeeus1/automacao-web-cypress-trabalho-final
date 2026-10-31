import { createUser } from '../../support/factories/user.factory';
import { openHome } from '../../support/flows/navigation';

describe('Assinatura na página inicial', () => {
  it('TC10 — confirma inscrição com e-mail fictício exclusivo', () => {
    const { email } = createUser('TC10');
    // Passos 1–3: home.
    openHome();
    // Passos 4–5: rodapé e seção de assinatura.
    cy.get('footer').scrollIntoView();
    cy.contains('footer h2', 'Subscription', { matchCase: false }).should('be.visible');
    // Passos 6: e-mail fictício e envio.
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    // Passos 7: confirmação visível.
    cy.contains('You have been successfully subscribed!').should('be.visible');
    cy.screenshot('tc10-assinatura-confirmada');
    // A aplicação não documenta uma operação de remoção de assinaturas.
  });
});
