import { cleanupAccount, createAccount, getAccount, parseApiBody, verifyCredentials } from '../support/api/accounts';
import { createUser } from '../support/factories/user.factory';
import type { TestUser } from '../support/types/test-data';

describe('Fase 3 — contrato real de contas temporárias', () => {
  let user: TestUser;
  beforeEach(() => { user = createUser('SUPPORT'); });
  afterEach(() => {
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
      if (pending.some((entry) => entry.email === user.email)) return cleanupAccount(user);
    });
  });

  it('gera identidades independentes e rejeita respostas inválidas', () => {
    const other = createUser('SUPPORT');
    expect(other.email).not.to.eq(user.email);
    expect(other.password).not.to.eq(user.password);
    expect(user.email).to.match(/^qa-tcd-support-.*@example\.com$/);
    expect(() => createUser('OUTRO')).to.throw('Identificador');
    expect(parseApiBody('{"responseCode":200}')).to.deep.eq({ responseCode: 200 });
    expect(parseApiBody({ responseCode: 404 })).to.deep.eq({ responseCode: 404 });
    expect(() => parseApiBody('<html>erro</html>')).to.throw();
    expect(() => parseApiBody({})).to.throw('responseCode');
  });

  it('cria, consulta dados completos, autentica e exclui a conta', () => {
    createAccount(user).then((account) => {
      cy.writeFile('artifacts/phase3/api-account-shape.json', account);
      expect(account).to.include({ name: user.name, email: user.email, title: user.title,
        first_name: user.address.firstName, last_name: user.address.lastName,
        company: user.address.company, address1: user.address.address1, address2: user.address.address2,
        country: user.address.country, state: user.address.state, city: user.address.city, zipcode: user.address.zipcode,
      });
      expect(String(account.birth_day)).to.eq(user.birth.day);
      expect(String(account.birth_month)).to.eq(user.birth.month);
      expect(String(account.birth_year)).to.eq(user.birth.year);
    });
    verifyCredentials(user);
    cleanupAccount(user);
    getAccount(user.email).should('eq', null);
  });

  it('limpa novamente uma conta já excluída sem ocultar erros', () => {
    createAccount(user);
    cleanupAccount(user);
    cleanupAccount(user);
    cy.task<TestUser[]>('accounts:pending', null, { log: false }).then((pending) => {
      expect(pending.map((entry) => entry.email)).not.to.include(user.email);
    });
  });
});
