import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const directory = process.argv[2] ?? (process.env.E2E_RUN_ID ? `artifacts/${process.env.E2E_RUN_ID}/reports` : null);
assert(directory, 'Informe a pasta reports da execução ou E2E_RUN_ID.');
const [html, json] = await Promise.all([
  readFile(join(directory, 'index.html'), 'utf8'),
  readFile(join(directory, 'index.json'), 'utf8'),
]);
assert.match(html, /<html/i, 'Relatório HTML ausente ou inválido');
const report = JSON.parse(json);
const testsOf = (suites) => suites.flatMap((suite) => [...(suite.tests ?? []), ...testsOf(suite.suites ?? [])]);
const tests = testsOf(report.results);
const expected = ['TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TC08', 'TC09', 'TC10', 'TC15', 'TC16'];
assert.equal(report.stats.tests, 10, 'Relatório deve conter os dez testes');
assert.deepEqual(tests.map((test) => test.title.match(/^TC\d{2}\b/)?.[0]).sort(), expected);
for (const id of expected) assert(html.includes(id), `${id} ausente no HTML`);
console.log(`HTML/JSON conferidos: ${tests.length} TCs; ${report.stats.passes} aprovados; ${report.stats.failures} falhas; ${report.stats.pending} pendentes.`);
// Resultado dos testes continua sendo responsabilidade do comando Cypress; não é neutralizado aqui.
