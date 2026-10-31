# Validações executadas

## Fase 2 — estrutura e configuração

Data: 30/10/2026, fuso America/Sao_Paulo. Execução básica iniciada aproximadamente às 19:20 locais.

Ambiente: macOS 27.2 arm64, Node.js 24.18.1, npm 11.16.0, Cypress 15.19.0 e Electron 138 headless.

### Alterações

- Manifesto, lockfile, versão do Node, TypeScript estrito e configuração Cypress.
- Scripts de execução e verificador estrutural de escopo.
- Pastas reservadas para cenários, fixtures e suporte, sem implementação de fases futuras.
- README inicial, matriz de 113 passos e tabela de conformidade.
- Evidências separadas por execução; dependências e artifacts ignorados pelo Git.

### Comandos e resultados reais

| Comando / verificação | Resultado |
|---|---|
| `npm view cypress@15.19.0 version --fetch-retries=0 --fetch-timeout=15000` | Primeiro falhou com ENOTFOUND no sandbox; consulta autorizada fora dele confirmou 15.19.0 |
| `npm install --save-exact --no-fund --fetch-retries=1 --fetch-timeout=30000` | Exit 0; 172 pacotes adicionados, 173 auditados, 0 vulnerabilidades reportadas pelo npm |
| `npm run cy:verify` | Primeiro abortou com SIGABRT no sandbox; execução autorizada fora dele verificou o binário, exit 0 |
| `npm ci --no-fund --fetch-retries=1 --fetch-timeout=30000` | Exit 0; instalação reproduzível pelo lockfile; 0 vulnerabilidades reportadas pelo npm |
| `npm run typecheck` | Exit 0 antes e depois de npm ci |
| `npm ls --depth=0` | Cypress 15.19.0, TypeScript 5.9.3 e @types/node 24.10.0 |
| `node --check scripts/check-scope.mjs` | Exit 0 |
| Conferência por Node do manifesto e lockfile | Três dependências diretas consistentes |
| `npm run check:scope` | Exit 1 esperado: identificou as dez specs ausentes |
| `npm run test:final` | Exit 1 esperado: barreira de escopo impede executar a suíte final incompleta |
| `git check-ignore node_modules artifacts/phase2/bootstrap.cy.ts` | Ambos ignorados |
| Contagem das linhas da matriz | 113 passos, dez casos |
| `npm run test:spec -- --config 'specPattern=artifacts/phase2/bootstrap.cy.ts'` | Exit 0; 1 aprovado, 0 falhas, 0 pendentes, 0 ignorados |

A verificação temporária abre a página inicial, verifica a rota e o cabeçalho e captura uma screenshot. Ela fica em artifacts, fora do specPattern normal e do versionamento. Não é nenhum dos dez casos acadêmicos e não comprova sua cobertura.

### Evidências locais

- [Spec temporária de inicialização](../artifacts/phase2/bootstrap.cy.ts)
- [Screenshot da página inicial](../artifacts/2026-10-30T22-20-48-108Z-36328320/screenshots/bootstrap.cy.ts/phase2-bootstrap.png)
- [Vídeo da execução](../artifacts/2026-10-30T22-20-48-108Z-36328320/videos/bootstrap.cy.ts.mp4)

Os links de artifacts são locais e transitórios; os arquivos não serão enviados ao Git. O screenshot foi inspecionado e mostra a página inicial da aplicação.

### Problemas, avisos e limites

- DNS e inicialização gráfica falharam no sandbox. As mesmas operações passaram com a execução externa autorizada; não foi necessário alterar configurações globais de rede ou segurança.
- npm emitiu aviso de postinstall do Cypress ainda não declarado em allowScripts. A instalação e a verificação do binário passaram; não foi alterada a política global do npm.
- Cypress emitiu aviso sobre o padrão allowCypressEnv habilitado. O projeto não utiliza Cypress.env() nem armazena credenciais reais. Nenhuma supressão de aviso foi adicionada.
- A contagem de 25 requisitos no planejamento estava incorreta: a tabela original fornecida tem 23. docs/conformidade.md preserva os 23 itens, sem inventar dois requisitos.
- Testes obrigatórios: 0 executados, 10 pendentes. Pipeline: não implementada nem executada. Mochawesome: integração reservada à Fase 5.

### Encerramento

Critérios técnicos da Fase 2 atendidos: instalação, lockfile, verificação do binário, TypeScript e execução básica em Electron comprovados. Revisão e aprovação do usuário ainda pendentes.

Próxima etapa proposta: Fase 3, recursos de suporte e validação dos contratos de preparação/limpeza. Não foram criadas contas, realizadas compras, feitos commits ou publicações nesta fase.

## Fase 3 — infraestrutura de suporte

Data: 30/10/2026, America/Sao_Paulo. Execução final do suporte às 19:29 locais; recuperação às 19:30.

### Implementação

- Tipos de usuário/endereço/pagamento/item, factory com UUID e fixture de pagamento fictício.
- API de criação, consulta, verificação de credenciais e limpeza idempotente, com códigos HTTP e funcionais separados.
- Registro local de propriedade e recuperação em artifacts/accounts, com restrição ao namespace descartável.
- Módulos de navegação, autenticação/cadastro, catálogo, carrinho e checkout.
- Duas specs de suporte e uma de recuperação fora do specPattern final, sem adicionar casos acadêmicos.
- Documentação de interfaces e uso em suporte.md; README e rastreabilidade atualizados.

### Validações efetivamente executadas

| Comando | Resultado |
|---|---|
| `npm run typecheck` | Exit 0 após correções de tipos e implementação dos módulos |
| `npm run validate:ledger` | Exit 0; namespace, caminho inválido, conta não registrada, colisão, credenciais, persistência e limpeza repetida |
| `node --check scripts/check-account-ledger.mjs` | Exit 0 |
| `npm run validate:support` (primeira execução, somente API existente) | 3 aprovados, 0 falhas |
| `npm run test:spec -- --config specPattern=cypress/validation/support-ui.cy.ts` (primeira tentativa) | 1 aprovado, 2 falhas: coleção jQuery não iterável |
| Mesmo comando (segunda tentativa) | 2 aprovados, 1 falha: tabela do checkout sem ID do carrinho |
| Mesmo comando (diagnóstico de HTML) | 2 aprovados, 1 falha reproduzida; HTML salvo para confirmar estrutura |
| `npm run validate:support > artifacts/phase3/support-run.log 2>&1` | **Exit 0; 6 aprovados, 0 falhas, 0 ignorados**, em aproximadamente 58 segundos |
| `npm run test:spec -- --config specPattern=artifacts/phase3/interruption.cy.ts > artifacts/phase3/interruption-run.log 2>&1` | **Exit 1 esperado; 1 falha intencional** após criação; conta continuou no registro |
| `npm run cleanup:accounts > artifacts/phase3/recovery-run.log 2>&1` | **Exit 0; 1 aprovado, 0 falhas**; recuperou a conta pendente |
| Conferência do registro local após recuperação | **13 registros de contas desta fase, 13 limpos, 0 pendentes** |
| `npm run check:scope` | Exit 1 esperado: somente as dez specs obrigatórias ausentes; suporte não entra na seleção final |
| `git check-ignore artifacts/accounts node_modules` | Registro e dependências ignorados pelo Git |

Não foram adicionadas dependências. O aviso MODULE_TYPELESS_PACKAGE_JSON no teste Node do registro não impediu a execução; o código TypeScript foi lido pelo suporte nativo do Node 24. A configuração de módulos do projeto foi preservada.

### Falhas encontradas e correções

1. Tipagem inicial das cadeias Cypress: retorno nulo precisa de `cy.wrap(null)` para não preservar o sujeito anterior; os helpers foram corrigidos antes da execução da API.
2. Coleção jQuery não iterável: substituída a expansão por `toArray()`, inclusive na leitura dos endereços.
3. Checkout sem ID cart_info_table: HTML real confirmou a diferença. O seletor usa a tabela que contém linhas identificadas por produto e exige unicidade. As verificações de preços, quantidades, totais e endereços foram mantidas.

As falhas anteriores permanecem documentadas. Não houve aumento de timeout, retries, espera fixa, clique forçado, supressão de exceção ou bloqueio de anúncios para obter aprovação.

### Evidências

- [Log final: seis verificações de suporte](../artifacts/phase3/support-run.log)
- [Log da falha controlada](../artifacts/phase3/interruption-run.log)
- [Log da recuperação](../artifacts/phase3/recovery-run.log)
- [Resumo de limpeza](../artifacts/phase3/cleanup-summary.json)
- [Checkout com dados sintéticos](../artifacts/2026-10-30T22-29-40-301Z-a487b57e/screenshots/support-ui.cy.ts/phase3-checkout.png)
- [Pagamento fictício preenchido](../artifacts/2026-10-30T22-29-40-301Z-a487b57e/screenshots/support-ui.cy.ts/phase3-payment-filled.png)
- [Vídeo da integração de interface](../artifacts/2026-10-30T22-29-40-301Z-a487b57e/videos/support-ui.cy.ts.mp4)
- [Vídeo dos contratos de API](../artifacts/2026-10-30T22-29-40-301Z-a487b57e/videos/support-api.cy.ts.mp4)

A falha controlada simula uma interrupção lógica sem hook de limpeza; não simula encerramento forçado do sistema operacional. Ela fica em artifacts e não integra a suíte de suporte normal ou a entrega versionada. Foi verificado que o registro sobrevive à execução com falha e que outra execução consegue recuperar a limpeza. Todas as exclusões marcaram a conta como limpa somente após consulta de ausência na API.

### Encerramento e pendências

Critérios técnicos da Fase 3 atendidos. Resultado normal: seis verificações de suporte e uma de recuperação aprovadas; a falha intencional retornou corretamente exit 1. Nenhuma conta pendente no registro.

O pagamento foi apenas preenchido, sem confirmação de compra. TC01–TC16 obrigatórios continuam PENDENTES e não receberam aprovação por causa destes testes de suporte. Mochawesome e GitHub Actions permanecem reservados à Fase 5. Não foram feitos commits ou publicações.

Próxima etapa proposta: **Fase 4, somente TC01**, com implementação, execução individual e conferência dos 18 passos. Aguardar aprovação explícita antes de começar.

## Fase 4 — TC01

Data: 30/10/2026, aproximadamente 19:33 em America/Sao_Paulo.

Implementado somente `cypress/e2e/trabalho-final/tc01-register-user.cy.ts`, com um único teste e reutilização dos módulos aprovados. Nenhum módulo de suporte precisou ser alterado. Fonte funcional reconferida: [TC01 oficial](https://automationexercise.com/test_cases).

### Validações executadas

| Comando | Resultado |
|---|---|
| `npm run typecheck` | Exit 0 |
| `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc01-register-user.cy.ts` | **Exit 0; 1 aprovado, 0 falhas, 0 pendentes, 0 ignorados; aproximadamente 18 segundos** |
| `npm run check:scope` | Exit 1 esperado: nove specs ausentes; TC01 reconhecido sem erro estrutural |
| Conferência do registro de contas | Uma conta TC01 registrada e limpa; zero pendentes, inclusive no registro global |

Execução em Cypress 15.19.0, Electron 138 headless, Node 24.18.1. Log preservado com redirecionamento para artifacts/tc01/run.log, sem alterar o código de saída.

### Revisão funcional e limpeza

Os 18 passos foram associados à implementação na matriz. O cenário comprova home e formulário inicial visíveis, cadastro completo com os dois checkboxes selecionados, valores de nascimento, endereço completo, confirmação de criação, identidade autenticada, exclusão UI e retorno à home sem autenticação.

A API consultou ausência inicial e registrou a conta para contingência; não criou a conta. Após a exclusão UI, o próprio teste consultou novamente a API e exigiu ausência **antes** do afterEach. O hook apenas confirmou a ausência e marcou o registro como limpo nesta execução. Uma limpeza de contingência não pode transformar uma exclusão UI defeituosa em aprovação do teste.

Quatro screenshots e um vídeo foram gerados. As imagens do formulário completo e da exclusão foram inspecionadas. Os seletores, asserções e mapeamento dos passos foram revisados. Não houve falha funcional nesta execução nem necessidade de retries, timeouts adicionais ou supressões.

### Evidências locais

- [Log individual](../artifacts/tc01/run.log)
- [Resumo de limpeza](../artifacts/tc01/cleanup-summary.json)
- [Formulário completo](../artifacts/2026-10-30T22-33-16-080Z-aa81e253/screenshots/tc01-register-user.cy.ts/tc01-formulario-completo.png)
- [Conta criada](../artifacts/2026-10-30T22-33-16-080Z-aa81e253/screenshots/tc01-register-user.cy.ts/tc01-conta-criada.png)
- [Usuário autenticado](../artifacts/2026-10-30T22-33-16-080Z-aa81e253/screenshots/tc01-register-user.cy.ts/tc01-usuario-autenticado.png)
- [Conta excluída](../artifacts/2026-10-30T22-33-16-080Z-aa81e253/screenshots/tc01-register-user.cy.ts/tc01-conta-excluida.png)
- [Vídeo](../artifacts/2026-10-30T22-33-16-080Z-aa81e253/videos/tc01-register-user.cy.ts.mp4)

TC01 aprovado tecnicamente em execução individual. Isso não declara estabilidade da suíte nem aprovação de CI. Nove cenários, Mochawesome, pipeline, integração e auditoria final continuam pendentes; nenhum commit ou publicação foi realizado.

Próxima etapa proposta: **somente TC02**, após aprovação explícita do usuário.

### TC02 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc02-login-valid.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc02.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC03 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc03-login-invalid.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc03.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC04 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc04-logout.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc04.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC05 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc05-register-existing-email.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc05.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC08 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc08-product-details.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc08.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC09 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc09-search-product.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc09.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC10 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc10-home-subscription.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc10.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC15 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc15-register-before-checkout.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc15.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

### TC16 — execução individual

Comando: `npm run test:spec -- --spec cypress/e2e/trabalho-final/tc16-login-before-checkout.cy.ts`. Resultado: exit 0, 1 aprovado, 0 falhas. Passos oficiais revisados e associados à implementação na matriz. [Log](../artifacts/individual/tc16.log) contém versões, duração e caminhos das evidências. A aprovação individual não substitui integração nem CI.

## Encerramento da Fase 4

Dez cenários aprovados individualmente, TypeScript válido e check:scope aprovado para dez specs com um it cada. A autorização do usuário passou a permitir avanço automático após etapas aprovadas.

A primeira execução do TC15 falhou procurando a mensagem transitória depois da navegação: [log preservado](../artifacts/individual/tc15-first-failure.log). O HTML real mostrou que o handler submit remove a classe hide de success_message antes de navegar. confirmPayment observa passivamente esse evento, comprova texto e visibilidade reais, deixa a navegação ocorrer e também exige a rota payment_done e a confirmação final. Não há preventDefault, atraso de rede, mock ou substituição da mensagem oficial. TC15 e TC16 passaram com essa implementação.

A execução de TC04 em uma tentativa anterior não iniciou: a revisão automática de aprovação estava indisponível por limite de uso. Após a retomada solicitada pelo usuário, a revisão permitiu a execução, que passou. Isso não foi uma falha do teste.

## Fase 5 — relatórios e workflow, validação local

Data local: 30/10/2026, America/Sao_Paulo. Fase 4 concluída antes do início desta etapa.

Instalado `cypress-mochawesome-reporter@5.0.0`, com plugin Node e registro no suporte do navegador. HTML e JSON ficam em artifacts/<run>/reports; screenshots são incorporadas ao relatório. E2E_RUN_ID permite selecionar uma pasta única em CI e em validações; sem a variável, a identificação temporal aleatória permanece.

### Verificações realizadas

| Comando / verificação | Resultado |
|---|---|
| `npm install --save-dev --save-exact cypress-mochawesome-reporter@5.0.0 --no-fund --fetch-retries=1 --fetch-timeout=30000` | Exit 0; 49 pacotes adicionados, 222 auditados, 0 vulnerabilidades reportadas |
| `npm run typecheck` | Exit 0 |
| `npm run check:scope` | Exit 0; exatamente dez specs e dez testes |
| `E2E_RUN_ID=phase5-suite npm run test:final` | **Exit 0; 10 aprovados, 0 falhas, 0 pendentes/ignorados; aproximadamente 2min07s** |
| `npm run check:reports -- artifacts/phase5-suite/reports` | Exit 0; HTML e JSON presentes com os dez IDs únicos |
| `E2E_RUN_ID=phase5-reporter-failure npm run test:spec -- --config specPattern=artifacts/phase5/reporter-failure.cy.ts` | **Exit 1 esperado; 1 falha controlada**, fora da seleção final |
| Inspeção do JSON/HTML de falha | failures=1, passes=0, erro esperado presente e screenshot PNG incorporada em base64 |
| Parser YAML e asserções sobre o workflow | Eventos corretos, comando final, dois uploads com always(), relatório obrigatório e ausência de continue-on-error |
| Registro de contas após as execuções | 26 registros, 26 limpos, 0 pendentes |
| `npm ci --no-fund --fetch-retries=1 --fetch-timeout=30000` | Instalação limpa concluída; 221 pacotes adicionados, 222 auditados, 0 vulnerabilidades reportadas; log em artifacts/phase5/npm-ci.log |
| `npm run typecheck`, `npm run check:scope` e `npm run check:reports -- artifacts/phase5-suite/reports` após npm ci | Todos com exit 0; relatório confirmado com 10 aprovados, 0 falhas e 0 pendentes |

A execução completa foi necessária para validar a consolidação do reporter. Não substitui as duas execuções e a ordem alternativa previstas para a Fase 6.

### Workflow preparado

`.github/workflows/e2e.yml`: push e PR para main, disparo manual, Ubuntu 24.04, Node da .nvmrc, npm ci, verificação do Cypress e TypeScript, execução dos dez testes, validação e upload de relatórios mesmo após falha. Relatório ausente produz erro. Retenção de artifacts: 30 dias. Não se inicia servidor local nem se usa Cypress Cloud.

O workflow não foi publicado nem executado no GitHub. Validação sintática e testes locais não aprovam CI, upload ou download dos artifacts remotos.

### Evidências

- [Relatório HTML dos dez cenários](../artifacts/phase5-suite/reports/index.html)
- [JSON consolidado](../artifacts/phase5-suite/reports/index.json)
- [Log da suíte completa](../artifacts/phase5/suite.log)
- [Log de falha controlada do reporter](../artifacts/phase5/reporter-failure.log)
- [HTML da falha controlada](../artifacts/phase5-reporter-failure/reports/index.html)
- [Resumo da limpeza](../artifacts/phase5/cleanup-summary.json)

Limitação de inspeção: a ferramenta de navegador bloqueou a abertura do HTML por protocolo file://. Não foi tentado contorno. Os arquivos foram validados estruturalmente, incluindo contagens, conteúdo e imagem incorporada; não se declara inspeção visual do HTML no navegador.

### Ponto de parada

Parte local da Fase 5 validada. Para concluí-la falta definir o repositório de destino, executar a pipeline real e conferir o download. O usuário autorizou commit/push/publicação e pediu commits separados por etapa. Não há remoto configurado. As Fases 6 e 7 não foram iniciadas automaticamente, pois a Fase 5 ainda não está integralmente concluída.
