import type { TestUser } from '../types/test-data';

export interface ApiAccount {
  id: number;
  name: string;
  email: string;
  title: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}
interface ApiBody { responseCode: number; message?: string; user?: ApiAccount }

export function cleanupTrackedAccount(user: TestUser) {
  return cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
    if (pending.some((entry) => entry.email === user.email)) return cleanupAccount(user);
  });
}

export function parseApiBody(body: unknown): ApiBody {
  const parsed = typeof body === 'string' ? JSON.parse(body) : body;
  if (!parsed || typeof parsed !== 'object' || typeof parsed.responseCode !== 'number') {
    throw new Error('Resposta da API sem responseCode numérico');
  }
  return parsed as ApiBody;
}

function bodyOf(response: Cypress.Response<unknown>): ApiBody {
  expect(response.status, 'status HTTP da API').to.eq(200);
  return parseApiBody(response.body);
}

export function getAccount(email: string): Cypress.Chainable<ApiAccount | null> {
  return cy.request({ method: 'GET', url: '/api/getUserDetailByEmail', qs: { email }, log: false, retryOnNetworkFailure: false }).then((response) => {
    const body = bodyOf(response);
    if (body.responseCode === 404) {
      expect(body.message).to.eq('Account not found with this email, try another email!');
      return cy.wrap<ApiAccount | null>(null, { log: false });
    }
    expect(body.responseCode).to.eq(200);
    expect(body.user, 'usuário retornado').to.be.an('object');
    expect(body.user!.email).to.eq(email);
    return cy.wrap<ApiAccount | null>(body.user!, { log: false });
  });
}

export function trackNewAccount(user: TestUser): Cypress.Chainable<null> {
  return getAccount(user.email).then((existing) => {
    expect(existing, 'e-mail ainda não registrado').to.eq(null);
    return cy.task<null>('accounts:track', user, { log: false });
  });
}

export function createAccount(user: TestUser): Cypress.Chainable<ApiAccount> {
  const a = user.address;
  return trackNewAccount(user).then(() => cy.request({
    method: 'POST', url: '/api/createAccount', form: true, log: false, retryOnNetworkFailure: false,
    body: {
      name: user.name, email: user.email, password: user.password, title: user.title,
      birth_date: user.birth.day, birth_month: user.birth.month, birth_year: user.birth.year,
      firstname: a.firstName, lastname: a.lastName, company: a.company,
      address1: a.address1, address2: a.address2, country: a.country,
      state: a.state, city: a.city, zipcode: a.zipcode, mobile_number: a.mobileNumber,
    },
  })).then((response) => {
    const body = bodyOf(response);
    expect(body.responseCode).to.eq(201);
    expect(body.message).to.eq('User created!');
    return getAccount(user.email);
  }).then((account) => {
    expect(account, 'conta criada').not.to.eq(null);
    return account!;
  });
}

export function verifyCredentials(user: TestUser): Cypress.Chainable<null> {
  return cy.request({ method: 'POST', url: '/api/verifyLogin', form: true,
    body: { email: user.email, password: user.password }, log: false, retryOnNetworkFailure: false,
  }).then((response) => {
    const body = bodyOf(response);
    expect(body.responseCode).to.eq(200);
    expect(body.message).to.eq('User exists!');
    return cy.wrap(null, { log: false });
  });
}

export function cleanupAccount(user: TestUser): Cypress.Chainable<null> {
  return cy.task('accounts:assertOwned', user, { log: false }).then(() => getAccount(user.email)).then((account) => {
    if (!account) return cy.wrap(null, { log: false });
    return cy.request({ method: 'DELETE', url: '/api/deleteAccount', form: true,
      body: { email: user.email, password: user.password }, log: false, retryOnNetworkFailure: false,
    }).then((response) => {
      const body = bodyOf(response);
      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq('Account deleted!');
      return getAccount(user.email).should('eq', null);
    });
  }).then(() => cy.task<null>('accounts:cleaned', user, { log: false }));
}
