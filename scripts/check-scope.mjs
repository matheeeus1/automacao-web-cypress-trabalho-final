import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const specRoot = join(root, 'cypress/e2e/trabalho-final');
const expected = new Map([
  ['tc01-register-user.cy.ts', 'TC01'],
  ['tc02-login-valid.cy.ts', 'TC02'],
  ['tc03-login-invalid.cy.ts', 'TC03'],
  ['tc04-logout.cy.ts', 'TC04'],
  ['tc05-register-existing-email.cy.ts', 'TC05'],
  ['tc08-product-details.cy.ts', 'TC08'],
  ['tc09-search-product.cy.ts', 'TC09'],
  ['tc10-home-subscription.cy.ts', 'TC10'],
  ['tc15-register-before-checkout.cy.ts', 'TC15'],
  ['tc16-login-before-checkout.cy.ts', 'TC16'],
]);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  }));
  return groups.flat();
}

const files = (await listFiles(specRoot)).filter((file) => file.endsWith('.cy.ts'));
const names = files.map((file) => relative(specRoot, file));
const errors = [];
for (const name of expected.keys()) {
  if (!names.includes(name)) errors.push(`Spec obrigatória ausente: ${name}`);
}
for (const file of files) {
  const name = relative(specRoot, file);
  const id = expected.get(name);
  if (!id) errors.push(`Spec fora do escopo aprovado: ${name}`);
  const source = ts.createSourceFile(file, await readFile(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const tests = [];
  function visit(node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.text === 'it') tests.push(node);
      if (ts.isIdentifier(expression) && ['xit', 'xdescribe', 'fit', 'fdescribe'].includes(expression.text)) {
        errors.push(`${name}: teste/suíte ignorado ou exclusivo`);
      }
      const modifier = ts.isPropertyAccessExpression(expression) ? expression.name.text
        : ts.isElementAccessExpression(expression) && ts.isStringLiteral(expression.argumentExpression)
          ? expression.argumentExpression.text : undefined;
      if (modifier === 'only' || modifier === 'skip') errors.push(`${name}: uso proibido de ${modifier}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (tests.length !== 1) errors.push(`${name}: esperado exatamente um it, encontrados ${tests.length}`);
  for (const test of tests) {
    const [title, body] = test.arguments;
    if (!title || !ts.isStringLiteral(title) || !id || !new RegExp(`^${id}\\b`).test(title.text)) {
      errors.push(`${name}: título literal deve iniciar com ${id ?? 'TC válido'}`);
    }
    if (!body || (!ts.isArrowFunction(body) && !ts.isFunctionExpression(body))) {
      errors.push(`${name}: it precisa de uma implementação, não pode estar pendente`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Escopo estrutural conferido: dez specs com um it por TC. Cobertura funcional depende da matriz e da execução.');
}
