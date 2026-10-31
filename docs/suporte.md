# Infraestrutura de suporte — Fase 3

Os módulos desta fase preparam a implementação dos dez cenários. As verificações em `cypress/validation/` não integram a seleção do trabalho final nem aprovam os TCs.

## Interfaces

| Módulo | Responsabilidade e uso |
|---|---|
| `types/test-data.ts` | `TestUser`, `Address`, `PaymentData`, `CartItem` |
| `factories/user.factory.ts` | `createUser(TC ou SUPPORT)` gera identidade nova em cada chamada; não há usuário global |
| `api/accounts.ts` | `createAccount`, `getAccount`, `verifyCredentials`, `trackNewAccount`, `cleanupAccount` |
| `api/account-ledger.ts` | Tasks Node de registro, verificação de propriedade, consulta de pendências e marcação de limpeza |
| `flows/navigation.ts` | Abertura da home e navegação pelo cabeçalho |
| `flows/account.ts` | Login, início/preenchimento do cadastro, identidade autenticada e exclusão UI |
| `flows/products.ts` | Leitura dos produtos, conversão validada de preço, adição e busca |
| `flows/cart.ts` | Conferência de identidade, preço, quantidade e subtotal por produto |
| `flows/checkout.ts` | Endereços de entrega/cobrança, resumo, total, observação e preenchimento de pagamento |

As ações simples de submissão permanecem visíveis nas specs. As funções compartilhadas retornam a cadeia Cypress quando há resultado a encadear; agrupamentos de múltiplas ações enfileiram comandos. Não há comandos customizados globais nem classes de página.

## Ciclo de vida das contas

1. Gerar `TestUser` localmente no início de cada teste.
2. Para pré-condição via API, chamar `createAccount`. Para cadastro UI, chamar `trackNewAccount` antes do fluxo.
3. O e-mail deve estar ausente antes do registro local; colisões falham.
4. O registro é gravado antes da criação remota, em `artifacts/accounts/`, com credenciais exclusivamente sintéticas.
5. Executar ações UI exigidas pelo caso, incluindo exclusão UI quando obrigatória.
6. No encerramento, consultar se a identidade está pendente e chamar `cleanupAccount`.
7. A limpeza valida a correspondência de e-mail/senha com o registro, confirma existência, exclui quando necessário e comprova ausência antes de marcar `cleaned`.

Um erro de rede, formato, código funcional ou mensagem inesperada permanece erro; não é convertido em ausência da conta. O helper não habilita retries de requisição que possam repetir mutações.

Somente e-mails com prefixo `qa-tcd`, cenário permitido, UUID v4 e domínio `example.com` entram no registro. O arquivo é criado sem sobrescrever uma identidade anterior. Sem o registro correspondente, a limpeza é recusada.

Uma interrupção pode impedir hooks. O comando `npm run cleanup:accounts` recupera as pendências locais e só deve ser executado sem outras execuções ativas. Não apagar os registros antes dessa recuperação. Perder o registro ou sofrer indisponibilidade remota ainda exige intervenção; não há promessa de limpeza infalível.

## Contratos observados

A [API oficial](https://automationexercise.com/api_list) usa status HTTP 200 nos endpoints examinados; o corpo contém `responseCode` 201 na criação, 200 no sucesso e 404 na consulta de conta ausente. O corpo pode chegar como texto JSON e é normalizado antes das asserções.

A consulta retornou nome, título, nascimento e endereço, mas não o telefone. O telefone foi validado na tela de checkout junto com os demais dados de entrega e cobrança; não se exige da API um campo que ela não retorna.

As tabelas de carrinho e checkout compartilham linhas com ID `product-<id>`, porém a tabela de checkout não tem o ID `cart_info_table`. O seletor comum identifica a tabela pelas linhas e exige unicidade, sem depender de índice visual.

## Validação e fronteira de escopo

```sh
npm run typecheck
npm run validate:ledger
npm run validate:support
```

- Registro: namespace, caminho inválido, conta não registrada, colisão, senha divergente, persistência e limpeza repetida.
- API: geração independente, formato de resposta, cadastro completo, consulta, credenciais, exclusão e segunda limpeza.
- UI: cadastro/exclusão; conta API utilizável no login; dois produtos no carrinho e checkout; endereços, valores e pagamento preenchido; catálogo/detalhes/busca.
- Recuperação: falha controlada temporária em `artifacts/phase3/interruption.cy.ts`, seguida do comando explícito de limpeza.

Nenhuma compra foi confirmada nesta fase. Pagamento, mensagens finais dos pedidos, logout e assinatura serão validados nos cenários pertinentes da Fase 4. As contas de suporte usam o identificador SUPPORT; os TCs usarão seus identificadores próprios.

Sem `.skip`, `.only`, espera fixa, clique forçado, bloqueio de anúncios, alteração de timeout ou supressão de exceções nos módulos. O código usa `toArray()` para converter coleções jQuery e asserções repetíveis para os endereços.

Resultados reais, falhas encontradas e evidências estão em [validacoes.md](validacoes.md).
