# Matriz de rastreabilidade

Fonte acadêmica: requisitos transcritos pelo usuário; documentos originais ausentes. Passos conferidos na [fonte oficial](https://automationexercise.com/test_cases) durante o planejamento de 30/10/2026 e novamente na auditoria de 31/10/2026. O acesso usa HTTPS.

Estado: 113 passos revisados; dez casos aprovados individualmente, na suíte completa, em ordem inversa e no GitHub. Consulte [integração](integracao.md) e [auditoria final](auditoria.md).

Cada cenário possui um único it identificado por TC. Passos de ação têm sua execução vinculada à evidência do cenário; asserções funcionais permanecem nos passos de verificação. O passo 1 é responsabilidade do executor Cypress.

Recursos da Fase 3: conta/API/factory para TC01–TC05, TC15 e TC16; catálogo para TC08/TC09; carrinho e checkout para TC15/TC16. Sua validação está em [validacoes.md](validacoes.md) e seu uso em [suporte.md](suporte.md). Somente os passos dos cenários executados com sucesso estão aprovados; validar suporte não equivale a validar os TCs.

## TC01 — Cadastro completo

- Pré-condições e massa: Usuário fictício completo; e-mail exclusivo não cadastrado.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc01-register-user.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | Executor Cypress / log de inicialização | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | openHome / spec linha 24 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | openHome / spec linha 24 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | navigateTo e rota / spec linhas 26–27 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar área de novo cadastro | Título New User Signup / spec linha 28 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar nome e e-mail | beginSignup / spec linha 30 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | enviar cadastro inicial | beginSignup / spec linha 30 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar formulário completo | fillAccountForm / spec linha 32 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | preencher título, senha e nascimento; conferir nome e e-mail | fillAccountForm e valores / spec linhas 32–36 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 10 | selecionar newsletter | fillAccountForm: newsletter / spec linha 32 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 11 | selecionar ofertas | fillAccountForm: optin / spec linha 32 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 12 | preencher nome, sobrenome, empresa, endereço 1 e 2, país, estado, cidade, CEP e telefone | fillAccountForm: endereço completo / spec linha 32 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 13 | criar conta | Clique create-account / spec linha 39 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 14 | validar confirmação de criação | Confirmação de criação / spec linha 40 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 15 | continuar | Clique Continue / spec linha 43 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 16 | validar identidade autenticada | assertLoggedIn / spec linha 45 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 17 | excluir conta pela interface | deleteAccountViaUi / spec linha 48 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 18 | validar exclusão e continuar | Confirmação, Continue e retorno / spec linhas 48–55 | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC02 — Login válido

- Pré-condições e massa: Conta própria criada por API com credenciais válidas.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc02-login-valid.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc02-login-valid.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc02-login-valid.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc02-login-valid.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | [tc02-login-valid.cy.ts: linha 14](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L14) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar formulário de login | [tc02-login-valid.cy.ts: linha 14](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L14) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar credenciais válidas | [tc02-login-valid.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | enviar login | [tc02-login-valid.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar identidade autenticada | [tc02-login-valid.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | excluir conta pela interface | [tc02-login-valid.cy.ts: linha 20](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L20) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 10 | validar confirmação de exclusão | [tc02-login-valid.cy.ts: linha 20](../cypress/e2e/trabalho-final/tc02-login-valid.cy.ts#L20) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC03 — Login inválido

- Pré-condições e massa: E-mail exclusivo não provisionado; senha inválida.
- Limpeza: Sem conta criada.
- Implementação: `cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc03-login-invalid.cy.ts: linha 10](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L10) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc03-login-invalid.cy.ts: linha 10](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L10) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc03-login-invalid.cy.ts: linha 10](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L10) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | [tc03-login-invalid.cy.ts: linha 11](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L11) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar formulário de login | [tc03-login-invalid.cy.ts: linha 11](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L11) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar credenciais inválidas | [tc03-login-invalid.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | enviar login | [tc03-login-invalid.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar mensagem específica de credenciais incorretas e ausência de autenticação | [tc03-login-invalid.cy.ts: linha 14](../cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts#L14) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC04 — Logout

- Pré-condições e massa: Conta própria criada por API.
- Limpeza: Excluir por API após cenário.
- Implementação: `cypress/e2e/trabalho-final/tc04-logout.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc04-logout.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc04-logout.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc04-logout.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | [tc04-logout.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar formulário de login | [tc04-logout.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar credenciais válidas | [tc04-logout.cy.ts: linha 15](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L15) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | enviar login | [tc04-logout.cy.ts: linha 15](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L15) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar identidade autenticada | [tc04-logout.cy.ts: linha 15](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L15) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | executar logout | [tc04-logout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 10 | validar retorno à rota de login, formulário e ausência de identidade autenticada | [tc04-logout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc04-logout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC05 — E-mail existente

- Pré-condições e massa: Conta própria criada por API; reutilizar seu e-mail no cadastro.
- Limpeza: Excluir por API após cenário.
- Implementação: `cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc05-register-existing-email.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc05-register-existing-email.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc05-register-existing-email.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | [tc05-register-existing-email.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar área de cadastro | [tc05-register-existing-email.cy.ts: linha 13](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L13) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar nome e e-mail já registrado | [tc05-register-existing-email.cy.ts: linha 15](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L15) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | enviar cadastro inicial | [tc05-register-existing-email.cy.ts: linha 15](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L15) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar mensagem específica de e-mail existente e ausência de avanço | [tc05-register-existing-email.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC08 — Catálogo e detalhes

- Pré-condições e massa: Catálogo real disponível; capturar primeiro produto.
- Limpeza: Sem mutação.
- Implementação: `cypress/e2e/trabalho-final/tc08-product-details.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc08-product-details.cy.ts: linha 6](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L6) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc08-product-details.cy.ts: linha 6](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L6) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc08-product-details.cy.ts: linha 6](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L6) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir produtos | [tc08-product-details.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar rota e título do catálogo | [tc08-product-details.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | validar listagem visível e não vazia | [tc08-product-details.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | abrir detalhes do primeiro produto | [tc08-product-details.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar rota do produto selecionado | [tc08-product-details.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | verificar nome, categoria, preço, disponibilidade, condição e marca; comparar nome e preço com catálogo | [tc08-product-details.cy.ts: linha 14](../cypress/e2e/trabalho-final/tc08-product-details.cy.ts#L14) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC09 — Busca

- Pré-condições e massa: Termo Blue Top; catálogo real disponível.
- Limpeza: Sem mutação.
- Implementação: `cypress/e2e/trabalho-final/tc09-search-product.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc09-search-product.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc09-search-product.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc09-search-product.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir produtos | [tc09-search-product.cy.ts: linha 8](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L8) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar catálogo | [tc09-search-product.cy.ts: linha 8](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L8) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar termo e pesquisar | [tc09-search-product.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | validar seção de resultados | [tc09-search-product.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | validar resultados não vazios, visibilidade, relação de todos os nomes com termo e presença do item conhecido | [tc09-search-product.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc09-search-product.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC10 — Assinatura

- Pré-condições e massa: E-mail fictício exclusivo em example.com.
- Limpeza: Sem remoção documentada; registrar limitação.
- Implementação: `cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc10-home-subscription.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc10-home-subscription.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc10-home-subscription.cy.ts: linha 7](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L7) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | rolar ao rodapé | [tc10-home-subscription.cy.ts: linha 8](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L8) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | validar seção de assinatura | [tc10-home-subscription.cy.ts: linha 8](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L8) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | informar e-mail e enviar | [tc10-home-subscription.cy.ts: linha 10](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L10) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | validar mensagem específica de inscrição bem-sucedida | [tc10-home-subscription.cy.ts: linha 12](../cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts#L12) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC15 — Cadastro antes da compra

- Pré-condições e massa: Usuário novo completo; dois produtos distintos, uma unidade cada; pagamento fictício.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc15-register-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc15-register-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc15-register-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir cadastro | [tc15-register-before-checkout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | cadastrar usuário completo pela interface | [tc15-register-before-checkout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | validar criação e continuar | [tc15-register-before-checkout.cy.ts: linha 22](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L22) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | validar identidade autenticada | [tc15-register-before-checkout.cy.ts: linha 22](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L22) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | adicionar dois produtos distintos | [tc15-register-before-checkout.cy.ts: linha 25](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L25) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | abrir carrinho | [tc15-register-before-checkout.cy.ts: linha 25](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L25) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 10 | validar carrinho, itens, preços, quantidades e totais | [tc15-register-before-checkout.cy.ts: linha 25](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L25) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 11 | iniciar checkout | [tc15-register-before-checkout.cy.ts: linha 30](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L30) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 12 | conferir entrega, cobrança e resumo com massa e carrinho | [tc15-register-before-checkout.cy.ts: linha 30](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L30) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 13 | preencher observação e avançar para pedido | [tc15-register-before-checkout.cy.ts: linha 34](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L34) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 14 | informar titular, número, CVC e validade futuros fictícios | [tc15-register-before-checkout.cy.ts: linha 36](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L36) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 15 | confirmar pagamento | [tc15-register-before-checkout.cy.ts: linha 37](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L37) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 16 | validar mensagem de sucesso da compra | [tc15-register-before-checkout.cy.ts: linha 37](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L37) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 17 | excluir conta pela interface | [tc15-register-before-checkout.cy.ts: linha 40](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L40) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 18 | validar exclusão e continuar | [tc15-register-before-checkout.cy.ts: linha 40](../cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts#L40) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |

## TC16 — Login antes da compra

- Pré-condições e massa: Conta completa criada por API; dois produtos distintos, uma unidade cada; pagamento fictício.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts`.
- Evidência: [execução CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138); [resultados por caso](integracao.md).

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | [tc16-login-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 2 | acessar aplicação por HTTPS | [tc16-login-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | [tc16-login-before-checkout.cy.ts: linha 16](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L16) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 4 | abrir autenticação | [tc16-login-before-checkout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 5 | informar credenciais existentes e entrar | [tc16-login-before-checkout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 6 | validar identidade autenticada | [tc16-login-before-checkout.cy.ts: linha 17](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L17) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 7 | adicionar dois produtos distintos | [tc16-login-before-checkout.cy.ts: linha 21](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L21) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 8 | abrir carrinho | [tc16-login-before-checkout.cy.ts: linha 21](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L21) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 9 | validar carrinho, itens, preços, quantidades e totais | [tc16-login-before-checkout.cy.ts: linha 21](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L21) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 10 | iniciar checkout | [tc16-login-before-checkout.cy.ts: linha 26](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L26) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 11 | conferir entrega, cobrança e resumo com massa e carrinho | [tc16-login-before-checkout.cy.ts: linha 26](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L26) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 12 | preencher observação e avançar para pedido | [tc16-login-before-checkout.cy.ts: linha 30](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L30) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 13 | informar pagamento fictício completo | [tc16-login-before-checkout.cy.ts: linha 32](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L32) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 14 | confirmar pagamento | [tc16-login-before-checkout.cy.ts: linha 33](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L33) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 15 | validar mensagem de sucesso da compra | [tc16-login-before-checkout.cy.ts: linha 33](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L33) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 16 | excluir conta pela interface | [tc16-login-before-checkout.cy.ts: linha 36](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L36) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
| 17 | validar exclusão e continuar | [tc16-login-before-checkout.cy.ts: linha 36](../cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts#L36) e módulos chamados | [CI e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | APROVADO |
