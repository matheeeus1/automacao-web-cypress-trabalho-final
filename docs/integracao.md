# Validação integrada — Fase 6

Resultados extraídos dos relatórios Mochawesome e dos códigos de saída, sem modificar testes ou usar retries. Horários em America/Sao_Paulo.

| Rodada | Início | Fim | Aprovados | Falhas | Ignorados/pendentes |
|---|---|---|---|---|---|
| Suíte completa local | 30/10/2026 21:29:37 | 30/10/2026 21:32:06 | 10 | 0 | 0 |
| Casos em ordem inversa | 31/10/2026 12:04:49 | 31/10/2026 12:07:54 | 10 | 0 | 0 |
| [GitHub Actions](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138) | Ver timestamps na execução | Ver timestamps na execução | 10 | 0 | 0 |

A rodada inversa executa dez processos Cypress sequenciais, um por spec, na ordem TC16 → TC15 → TC10 → TC09 → TC08 → TC05 → TC04 → TC03 → TC02 → TC01. Cada processo gera HTML/JSON, screenshots e vídeo próprios. O executor interrompe em qualquer código não zero ou resultado diferente de um teste aprovado. Isso comprova a ordem real sem depender da ordenação interna do Cypress.

## Resultado por caso

| Caso | Suíte local | Ordem inversa | CI | Duração inversa (s) |
|---|---|---|---|---|
| TC01 | APROVADO | APROVADO | APROVADO | 23.355 |
| TC02 | APROVADO | APROVADO | APROVADO | 13.669 |
| TC03 | APROVADO | APROVADO | APROVADO | 7.722 |
| TC04 | APROVADO | APROVADO | APROVADO | 12.117 |
| TC05 | APROVADO | APROVADO | APROVADO | 9.982 |
| TC08 | APROVADO | APROVADO | APROVADO | 7.810 |
| TC09 | APROVADO | APROVADO | APROVADO | 8.022 |
| TC10 | APROVADO | APROVADO | APROVADO | 7.159 |
| TC15 | APROVADO | APROVADO | APROVADO | 28.058 |
| TC16 | APROVADO | APROVADO | APROVADO | 25.186 |

## Comandos e evidências

- Suíte: `E2E_RUN_ID=phase6-suite npm run test:final` — exit 0.
- Ordem inversa: `python3 artifacts/phase6/run-reversed.py` — exit 0. Esse executor local de validação não integra a entrega; a sequência pode ser reproduzida com o comando abaixo.
- TypeScript, `check:scope`, `validate:ledger` e `check:reports -- artifacts/phase6-suite/reports` — exit 0.
- Registro local ao encerrar: **38 contas registradas, 38 limpas, 0 pendentes**. Cada limpeza comprova ausência remota antes de registrar sucesso.
- Arquivos locais ignorados pelo Git: `artifacts/phase6/suite.log`, `reversed.log`, `reversed-summary.json`, `artifacts/phase6-suite/reports/index.html` e `artifacts/phase6-reversed-tcNN/reports/index.html`.
- Evidência compartilhável: [pipeline e artifacts](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138), relatório `relatorios-41150162138-1` (ID 13022886422), já baixado e conferido.

Para repetir a ordem inversa em shell POSIX, escolhendo um prefixo novo:

```sh
run_prefix="independencia-$(date +%Y%m%dT%H%M%S)"
for tc in 16 15 10 09 08 05 04 03 02 01; do
  E2E_RUN_ID="$run_prefix-tc$tc" npm run test:spec -- --spec "cypress/e2e/trabalho-final/tc$tc-*.cy.ts" || exit "$?"
done
```

A estabilidade está limitada às execuções observadas. A aplicação externa pode mudar ou ficar indisponível. `validate:ledger` emitiu um aviso de inferência de módulo ES pelo Node; o comando passou e não houve erro funcional.
