import type { TestUser } from '../types/test-data';

export function createUser(caseId: string): TestUser {
  if (!/^(TC(?:01|02|03|04|05|08|09|10|15|16)|SUPPORT)$/.test(caseId)) {
    throw new Error('Identificador de cenário fora do escopo');
  }
  return {
    name: `QA ${caseId}`,
    email: `qa-tcd-${caseId.toLowerCase()}-${crypto.randomUUID()}@example.com`,
    password: `Ficticia!${crypto.randomUUID()}`,
    title: 'Mr',
    birth: { day: '15', month: '6', year: '1995' },
    address: {
      firstName: 'Usuario', lastName: 'Sintetico', company: 'Empresa de Teste',
      address1: '123 Test Street', address2: 'Apartment 10', country: 'Canada',
      state: 'Ontario', city: 'Toronto', zipcode: 'M5V 1A1', mobileNumber: '4165550100',
    },
  };
}
