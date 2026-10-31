import { getAccount } from '../../support/api/accounts';
import { createUser } from '../../support/factories/user.factory';
import { login } from '../../support/flows/account';
import { navigateTo, openHome } from '../../support/flows/navigation';

describe('Login inválido', () => {
  it('TC03 — rejeita e-mail e senha incorretos', () => {
    const user = createUser('TC03');
    getAccount(user.email).should('eq', null);
    // Passos 1–3: home.
    openHome();
    // Passos 4–5: formulário.
    navigateTo('login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    // Passos 6–7: credenciais inválidas e envio.
    login(user);
    // Passos 8: erro específico, sem autenticação.
    cy.contains('form[action="/login"] p', 'Your email or password is incorrect!').should('be.visible');
    cy.location('pathname').should('eq', '/login');
    cy.contains('header a', 'Logged in as').should('not.exist');
    cy.screenshot('tc03-credenciais-invalidas');
  });
});
