# Matriz de rastreabilidade

Fonte acadêmica: requisitos transcritos pelo usuário; documentos originais ausentes. Passos conferidos na [fonte oficial](https://automationexercise.com/test_cases) durante o planejamento de 30/10/2026. HTTPS será usado para acesso.

Estado: Fase 4 concluída. Os dez cenários e seus 113 passos foram revisados e aprovados em execuções individuais. Execução completa local: 10 aprovados, 0 falhas. CI real ainda pendente.

Cada cenário possui um único it identificado por TC. Passos de ação terão sua execução vinculada à evidência do cenário; asserções funcionais permanecem nos passos de verificação. O passo 1 é responsabilidade do executor Cypress.

Recursos da Fase 3: conta/API/factory para TC01–TC05, TC15 e TC16; catálogo para TC08/TC09; carrinho e checkout para TC15/TC16. Sua validação está em [validacoes.md](validacoes.md) e seu uso em [suporte.md](suporte.md). Somente os passos dos cenários executados com sucesso estão aprovados; validar suporte não equivale a validar os TCs.

## TC01 — Cadastro completo

- Pré-condições e massa: Usuário fictício completo; e-mail exclusivo não cadastrado.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc01-register-user.cy.ts`.
- Evidência: [log da execução individual](../artifacts/tc01/run.log), quatro screenshots e vídeo descritos em [validações](validacoes.md#fase-4--tc01). Mochawesome e artifact remoto permanecem para a Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação / referência | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | Executor Cypress / log de inicialização | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | openHome / spec linha 26 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | openHome / spec linha 26 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 4 | abrir autenticação | navigateTo e rota / spec linhas 29–30 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 5 | validar área de novo cadastro | Título New User Signup / spec linha 31 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 6 | informar nome e e-mail | beginSignup / spec linha 34 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 7 | enviar cadastro inicial | beginSignup / spec linha 34 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 8 | validar formulário completo | fillAccountForm / spec linha 37 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 9 | preencher título, senha e nascimento; conferir nome e e-mail | fillAccountForm e valores / spec linhas 37–41 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 10 | selecionar newsletter | fillAccountForm: newsletter / spec linha 37 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 11 | selecionar ofertas | fillAccountForm: optin / spec linha 37 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 12 | preencher nome, sobrenome, empresa, endereço 1 e 2, país, estado, cidade, CEP e telefone | fillAccountForm: endereço completo / spec linha 37 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 13 | criar conta | Clique create-account / spec linha 45 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 14 | validar confirmação de criação | Confirmação de criação / spec linha 46 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 15 | continuar | Clique Continue / spec linha 50 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 16 | validar identidade autenticada | assertLoggedIn / spec linha 52 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 17 | excluir conta pela interface | deleteAccountViaUi / spec linha 56 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |
| 18 | validar exclusão e continuar | Confirmação, Continue e retorno / spec linhas 56–64 | [TC01: exit 0](../artifacts/tc01/run.log) | APROVADO |

## TC02 — Login válido

- Pré-condições e massa: Conta própria criada por API com credenciais válidas.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc02-login-valid.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc02-login-valid.cy.ts: linha 14 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc02-login-valid.cy.ts: linha 14 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc02-login-valid.cy.ts: linha 14 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 4 | abrir autenticação | tc02-login-valid.cy.ts: linha 16 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 5 | validar formulário de login | tc02-login-valid.cy.ts: linha 16 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 6 | informar credenciais válidas | tc02-login-valid.cy.ts: linha 20 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 7 | enviar login | tc02-login-valid.cy.ts: linha 20 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 8 | validar identidade autenticada | tc02-login-valid.cy.ts: linha 20 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 9 | excluir conta pela interface | tc02-login-valid.cy.ts: linha 24 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |
| 10 | validar confirmação de exclusão | tc02-login-valid.cy.ts: linha 24 e módulos chamados | [Execução individual](../artifacts/individual/tc02.log) | APROVADO |

## TC03 — Login inválido

- Pré-condições e massa: E-mail exclusivo não provisionado; senha inválida.
- Limpeza: Sem conta criada.
- Implementação: `cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc03-login-invalid.cy.ts: linha 11 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc03-login-invalid.cy.ts: linha 11 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc03-login-invalid.cy.ts: linha 11 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 4 | abrir autenticação | tc03-login-invalid.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 5 | validar formulário de login | tc03-login-invalid.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 6 | informar credenciais inválidas | tc03-login-invalid.cy.ts: linha 16 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 7 | enviar login | tc03-login-invalid.cy.ts: linha 16 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |
| 8 | validar mensagem específica de credenciais incorretas e ausência de autenticação | tc03-login-invalid.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc03.log) | APROVADO |

## TC04 — Logout

- Pré-condições e massa: Conta própria criada por API.
- Limpeza: Excluir por API após cenário.
- Implementação: `cypress/e2e/trabalho-final/tc04-logout.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc04-logout.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc04-logout.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc04-logout.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 4 | abrir autenticação | tc04-logout.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 5 | validar formulário de login | tc04-logout.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 6 | informar credenciais válidas | tc04-logout.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 7 | enviar login | tc04-logout.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 8 | validar identidade autenticada | tc04-logout.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 9 | executar logout | tc04-logout.cy.ts: linha 21 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |
| 10 | validar retorno à rota de login, formulário e ausência de identidade autenticada | tc04-logout.cy.ts: linha 21 e módulos chamados | [Execução individual](../artifacts/individual/tc04.log) | APROVADO |

## TC05 — E-mail existente

- Pré-condições e massa: Conta própria criada por API; reutilizar seu e-mail no cadastro.
- Limpeza: Excluir por API após cenário.
- Implementação: `cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc05-register-existing-email.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc05-register-existing-email.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc05-register-existing-email.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 4 | abrir autenticação | tc05-register-existing-email.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 5 | validar área de cadastro | tc05-register-existing-email.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 6 | informar nome e e-mail já registrado | tc05-register-existing-email.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 7 | enviar cadastro inicial | tc05-register-existing-email.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |
| 8 | validar mensagem específica de e-mail existente e ausência de avanço | tc05-register-existing-email.cy.ts: linha 20 e módulos chamados | [Execução individual](../artifacts/individual/tc05.log) | APROVADO |

## TC08 — Catálogo e detalhes

- Pré-condições e massa: Catálogo real disponível; capturar primeiro produto.
- Limpeza: Sem mutação.
- Implementação: `cypress/e2e/trabalho-final/tc08-product-details.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc08-product-details.cy.ts: linha 7 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc08-product-details.cy.ts: linha 7 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc08-product-details.cy.ts: linha 7 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 4 | abrir produtos | tc08-product-details.cy.ts: linha 9 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 5 | validar rota e título do catálogo | tc08-product-details.cy.ts: linha 9 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 6 | validar listagem visível e não vazia | tc08-product-details.cy.ts: linha 9 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 7 | abrir detalhes do primeiro produto | tc08-product-details.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 8 | validar rota do produto selecionado | tc08-product-details.cy.ts: linha 15 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |
| 9 | verificar nome, categoria, preço, disponibilidade, condição e marca; comparar nome e preço com catálogo | tc08-product-details.cy.ts: linha 18 e módulos chamados | [Execução individual](../artifacts/individual/tc08.log) | APROVADO |

## TC09 — Busca

- Pré-condições e massa: Termo Blue Top; catálogo real disponível.
- Limpeza: Sem mutação.
- Implementação: `cypress/e2e/trabalho-final/tc09-search-product.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc09-search-product.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc09-search-product.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc09-search-product.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 4 | abrir produtos | tc09-search-product.cy.ts: linha 10 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 5 | validar catálogo | tc09-search-product.cy.ts: linha 10 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 6 | informar termo e pesquisar | tc09-search-product.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 7 | validar seção de resultados | tc09-search-product.cy.ts: linha 21 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |
| 8 | validar resultados não vazios, visibilidade, relação de todos os nomes com termo e presença do item conhecido | tc09-search-product.cy.ts: linha 21 e módulos chamados | [Execução individual](../artifacts/individual/tc09.log) | APROVADO |

## TC10 — Assinatura

- Pré-condições e massa: E-mail fictício exclusivo em example.com.
- Limpeza: Sem remoção documentada; registrar limitação.
- Implementação: `cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc10-home-subscription.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc10-home-subscription.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc10-home-subscription.cy.ts: linha 8 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 4 | rolar ao rodapé | tc10-home-subscription.cy.ts: linha 10 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 5 | validar seção de assinatura | tc10-home-subscription.cy.ts: linha 10 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 6 | informar e-mail e enviar | tc10-home-subscription.cy.ts: linha 13 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |
| 7 | validar mensagem específica de inscrição bem-sucedida | tc10-home-subscription.cy.ts: linha 16 e módulos chamados | [Execução individual](../artifacts/individual/tc10.log) | APROVADO |

## TC15 — Cadastro antes da compra

- Pré-condições e massa: Usuário novo completo; dois produtos distintos, uma unidade cada; pagamento fictício.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc15-register-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc15-register-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc15-register-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 4 | abrir cadastro | tc15-register-before-checkout.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 5 | cadastrar usuário completo pela interface | tc15-register-before-checkout.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 6 | validar criação e continuar | tc15-register-before-checkout.cy.ts: linha 25 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 7 | validar identidade autenticada | tc15-register-before-checkout.cy.ts: linha 25 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 8 | adicionar dois produtos distintos | tc15-register-before-checkout.cy.ts: linha 29 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 9 | abrir carrinho | tc15-register-before-checkout.cy.ts: linha 29 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 10 | validar carrinho, itens, preços, quantidades e totais | tc15-register-before-checkout.cy.ts: linha 29 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 11 | iniciar checkout | tc15-register-before-checkout.cy.ts: linha 35 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 12 | conferir entrega, cobrança e resumo com massa e carrinho | tc15-register-before-checkout.cy.ts: linha 35 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 13 | preencher observação e avançar para pedido | tc15-register-before-checkout.cy.ts: linha 40 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 14 | informar titular, número, CVC e validade futuros fictícios | tc15-register-before-checkout.cy.ts: linha 43 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 15 | confirmar pagamento | tc15-register-before-checkout.cy.ts: linha 45 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 16 | validar mensagem de sucesso da compra | tc15-register-before-checkout.cy.ts: linha 45 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 17 | excluir conta pela interface | tc15-register-before-checkout.cy.ts: linha 49 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |
| 18 | validar exclusão e continuar | tc15-register-before-checkout.cy.ts: linha 49 e módulos chamados | [Execução individual](../artifacts/individual/tc15.log) | APROVADO |

## TC16 — Login antes da compra

- Pré-condições e massa: Conta completa criada por API; dois produtos distintos, uma unidade cada; pagamento fictício.
- Limpeza: Exclusão UI; API de contingência.
- Implementação: `cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts`.
- Evidência prevista: comando, data, versões, resultado e screenshots; HTML/JSON e artifact a partir da Fase 5.

| Passo oficial | Ação / verificação esperada | Implementação planejada | Evidência | Status |
|---|---|---|---|---|
| 1 | iniciar navegador pelo executor Cypress | tc16-login-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 2 | acessar aplicação por HTTPS | tc16-login-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 3 | validar rota inicial, navegação e conteúdo principal visíveis | tc16-login-before-checkout.cy.ts: linha 17 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 4 | abrir autenticação | tc16-login-before-checkout.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 5 | informar credenciais existentes e entrar | tc16-login-before-checkout.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 6 | validar identidade autenticada | tc16-login-before-checkout.cy.ts: linha 19 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 7 | adicionar dois produtos distintos | tc16-login-before-checkout.cy.ts: linha 24 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 8 | abrir carrinho | tc16-login-before-checkout.cy.ts: linha 24 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 9 | validar carrinho, itens, preços, quantidades e totais | tc16-login-before-checkout.cy.ts: linha 24 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 10 | iniciar checkout | tc16-login-before-checkout.cy.ts: linha 30 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 11 | conferir entrega, cobrança e resumo com massa e carrinho | tc16-login-before-checkout.cy.ts: linha 30 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 12 | preencher observação e avançar para pedido | tc16-login-before-checkout.cy.ts: linha 35 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 13 | informar pagamento fictício completo | tc16-login-before-checkout.cy.ts: linha 38 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 14 | confirmar pagamento | tc16-login-before-checkout.cy.ts: linha 40 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 15 | validar mensagem de sucesso da compra | tc16-login-before-checkout.cy.ts: linha 40 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 16 | excluir conta pela interface | tc16-login-before-checkout.cy.ts: linha 44 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
| 17 | validar exclusão e continuar | tc16-login-before-checkout.cy.ts: linha 44 e módulos chamados | [Execução individual](../artifacts/individual/tc16.log) | APROVADO |
