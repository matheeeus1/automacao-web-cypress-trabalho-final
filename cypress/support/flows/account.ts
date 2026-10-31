import type { TestUser } from '../types/test-data';

export const accountSelectors = {
  loginEmail: '[data-qa="login-email"]', loginPassword: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]', signupName: '[data-qa="signup-name"]',
  signupEmail: '[data-qa="signup-email"]', signupButton: '[data-qa="signup-button"]',
  created: '[data-qa="account-created"]', deleted: '[data-qa="account-deleted"]',
  continue: '[data-qa="continue-button"]',
};

export function login(user: TestUser) {
  cy.get(accountSelectors.loginEmail).should('be.visible').type(user.email);
  cy.get(accountSelectors.loginPassword).type(user.password, { log: false });
  return cy.get(accountSelectors.loginButton).click();
}

export function beginSignup(user: TestUser) {
  cy.get(accountSelectors.signupName).should('be.visible').type(user.name);
  cy.get(accountSelectors.signupEmail).type(user.email);
  return cy.get(accountSelectors.signupButton).click();
}

export function fillAccountForm(user: TestUser) {
  cy.contains('h2', 'Enter Account Information', { matchCase: false }).should('be.visible');
  cy.get(`input[name="title"][value="${user.title}"]`).check().should('be.checked');
  cy.get('[data-qa="name"]').should('have.value', user.name);
  cy.get('[data-qa="email"]').should('have.value', user.email).and('be.disabled');
  cy.get('[data-qa="password"]').type(user.password, { log: false });
  cy.get('[data-qa="days"]').select(user.birth.day);
  cy.get('[data-qa="months"]').select(user.birth.month);
  cy.get('[data-qa="years"]').select(user.birth.year);
  cy.get('#newsletter').check().should('be.checked');
  cy.get('#optin').check().should('be.checked');
  const a = user.address;
  const fields = { first_name: a.firstName, last_name: a.lastName, company: a.company,
    address: a.address1, address2: a.address2, state: a.state, city: a.city,
    zipcode: a.zipcode, mobile_number: a.mobileNumber };
  Object.entries(fields).forEach(([qa, value]) => cy.get(`[data-qa="${qa}"]`).type(value).should('have.value', value));
  return cy.get('[data-qa="country"]').select(a.country).should('have.value', a.country);
}

export function assertLoggedIn(user: TestUser) {
  return cy.contains('header a', 'Logged in as').should('be.visible').find('b').should('have.text', user.name);
}

export function deleteAccountViaUi() {
  cy.get('header a[href="/delete_account"]').should('be.visible').click();
  return cy.get(accountSelectors.deleted).should('be.visible').and('contain.text', 'Account Deleted!');
}
