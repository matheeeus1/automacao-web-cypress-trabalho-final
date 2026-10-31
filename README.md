# Automação web com Cypress — trabalho de conclusão de disciplina

Testes E2E da aplicação [Automation Exercise](https://automationexercise.com), desenvolvidos com rastreabilidade dos passos oficiais, contas independentes e limpeza controlada.

**Estado: PROJETO APTO PARA ENTREGA no escopo transcrito. Dez cenários e 113 passos revisados, suíte completa e ordem inversa aprovadas, pipeline real e download dos artifacts comprovados.**

## Tecnologias e pré-requisitos

- Node.js 24.18.1 (`.nvmrc`) e npm 11.x.
- Cypress 15.19.0, TypeScript 5.9.3, tipos de Node.js 24.10.0.
- `cypress-mochawesome-reporter` 5.0.0.
- Internet para instalação e acesso à aplicação externa.
- Sistema compatível com os [requisitos do Cypress](https://docs.cypress.io/app/get-started/install-cypress).

Electron é fornecido pelo Cypress. Não é necessário iniciar servidor da aplicação nem configurar credenciais reais, Cypress Cloud ou BrowserStack.

## Instalação e execução

Se usar nvm, execute `nvm install` e `nvm use` na raiz. Depois:

```sh
npm ci
npm run cy:verify
npm run typecheck
npm run check:scope
npm run test:final
```

O lockfile fixa as dependências. `test:final` exige os dez arquivos e um teste implementado por cenário antes de executar a pasta do trabalho final.

Execução interativa e individual:

```sh
npm run cy:open
npm run test:spec -- --spec cypress/e2e/trabalho-final/tc01-register-user.cy.ts
```

Para nomear uma execução e conferir seu relatório consolidado (shell POSIX):

```sh
E2E_RUN_ID=minha-execucao-01 npm run test:final
npm run check:reports -- artifacts/minha-execucao-01/reports
```

Use um identificador novo a cada execução. Sem `E2E_RUN_ID`, o projeto gera data/hora e sufixo aleatório. Reutilizar o mesmo identificador permite que o reporter sobrescreva o relatório daquele diretório.

## Organização

| Local | Responsabilidade |
|---|---|
| `cypress.config.ts` | URL, isolamento, reporter, viewport, tasks e evidências |
| `cypress/e2e/trabalho-final/` | Exatamente os dez casos acadêmicos |
| `cypress/support/api/` | Preparação, consulta, limpeza e registro local de contas |
| `cypress/support/factories/` | Dados fictícios e identidades exclusivas |
| `cypress/support/flows/` | Navegação, conta, produtos, carrinho e checkout |
| `cypress/support/types/` | Contratos de dados TypeScript |
| `cypress/fixtures/` | Pagamento fictício |
| `cypress/validation/` | Verificações de suporte e recuperação fora da suíte final |
| `scripts/` | Conferência de escopo, relatórios e registro de contas |
| `.github/workflows/e2e.yml` | Pipeline preparada para GitHub Actions |
| `docs/` | Rastreabilidade, validações, suporte e conformidade |
| `artifacts/` | Relatórios, screenshots, vídeos e registros locais ignorados pelo Git |

## Casos automatizados

Todos abaixo passaram individualmente, na suíte completa, em ordem inversa e no GitHub. Veja os [resultados por caso](docs/integracao.md) e a [auditoria final](docs/auditoria.md).

| ID | Comportamento |
|---|---|
| TC01 | Cadastro completo, autenticação e exclusão |
| TC02 | Login válido e exclusão |
| TC03 | Rejeição de credenciais inválidas |
| TC04 | Logout e retorno à autenticação |
| TC05 | Rejeição de e-mail já registrado |
| TC08 | Catálogo e seis informações do primeiro produto |
| TC09 | Busca com resultados completos e relacionados ao termo |
| TC10 | Assinatura na página inicial |
| TC15 | Cadastro antes da compra, checkout, pagamento e exclusão |
| TC16 | Login antes da compra, checkout, pagamento e exclusão |

Cada caso possui um `it`, massa própria e referência aos passos oficiais. Consulte a [matriz dos 113 passos](docs/rastreabilidade.md), os [resultados efetivos](docs/validacoes.md) e a [conformidade](docs/conformidade.md).

## Dados, isolamento e limpeza

A factory usa UUID e e-mails `qa-tcd-<TC>-<UUID>@example.com`. Os dados pessoais e financeiros são fictícios. TC02, TC04, TC05 e TC16 criam pré-condições por API; os passos obrigatórios de interface permanecem na interface.

Antes da criação remota, a identidade é registrada em `artifacts/accounts/`. A limpeza exige correspondência com esse registro e confirma ausência da conta antes de marcá-la como limpa. Não remover o registro enquanto houver pendências.

```sh
npm run validate:ledger
npm run validate:support
```

Após uma interrupção, **sem outras execuções ativas neste projeto**, recuperar contas pendentes:

```sh
npm run cleanup:accounts
```

O comando só usa contas sintéticas previamente registradas; não varre o servidor. Consulte [suporte e contratos](docs/suporte.md).

## Relatórios e evidências

Após uma execução Cypress, abra `artifacts/<identificador>/reports/index.html` no navegador. O JSON consolidado fica ao lado, em `index.json`. HTML inclui recursos e screenshots incorporados; vídeos e screenshots originais ficam nas pastas `videos/` e `screenshots/` da execução.

`check:reports` exige HTML, JSON e os dez IDs sem duplicação. Ele confere integridade do relatório; o código de saída do Cypress continua determinando falhas dos testes. Uma falha anterior à inicialização pode impedir a criação de relatório, situação que permanece erro.

## GitHub Actions

O workflow está configurado para push em `main`, pull requests para `main` e execução manual. Usa Ubuntu 24.04, Node da `.nvmrc`, `npm ci`, verificação do Cypress, TypeScript e `test:final`. Somente as dez specs finais são selecionadas.

Após a execução, os passos com `if: always()` conferem e publicam relatórios e evidências. Ausência de relatório obrigatório provoca falha. Não há `continue-on-error` nem descarte do código de erro.

No GitHub, abrir **Actions → Trabalho final — Cypress → execução → Artifacts**. Baixar `relatorios-<run_id>-<tentativa>`, extrair e abrir `index.html`. Screenshots e vídeos ficam no artifact `evidencias-<run_id>-<tentativa>`. Retenção: 30 dias; guardar evidências relevantes antes de expirarem.

[Pipeline validada e artifacts conferidos](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138): 10 aprovados, 0 falhas. [Repositório público](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final).

## Limitações e decisões

- Os documentos originais do professor não foram encontrados; os requisitos transcritos pelo usuário são a fonte acadêmica disponível.
- Aplicação externa pode sofrer indisponibilidade ou anúncios intersticiais. Não há supressão global de exceções, bloqueio de anúncios, retries de teste, esperas fixas ou cliques forçados.
- O pagamento mostra a mensagem oficial no submit e navega imediatamente. Um observador passivo verifica texto/visibilidade nesse momento; o teste também exige a confirmação final na página de pedido. Não há bloqueio ou atraso da navegação.
- TC10 usa endereço fictício; não há operação documentada para remover assinaturas.
- Hooks não garantem limpeza após interrupção do processo; o registro permite recuperação explícita.
- Relatórios estão disponíveis nos artifacts da pipeline por 30 dias; evidências locais e dependências não são versionadas.
- ZIP sem `node_modules` será preparado quando solicitado. Commits e push foram autorizados pelo usuário.

A [tabela final de conformidade](docs/conformidade.md) contém 23 requisitos aprovados, sem pendências impeditivas. A aprovação considera os requisitos transcritos; documentos adicionais do professor podem exigir nova conferência.

## Fontes

- [Casos funcionais](https://automationexercise.com/test_cases)
- [APIs](https://automationexercise.com/api_list)
- [Cypress](https://docs.cypress.io/)
- [Reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
