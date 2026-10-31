# Auditoria final — Fase 7

Revisão de 31/10/2026. **PROJETO APTO PARA ENTREGA**, dentro do escopo transcrito pelo usuário. Foram conferidos os dez casos, seus 113 passos, suporte, configuração, scripts, evidências, documentação e execução real no GitHub. Nenhum requisito obrigatório permaneceu pendente.

## Fontes e método

O prompt original e sua tabela de conformidade foram relidos. A [página oficial de casos](https://automationexercise.com/test_cases) e a [documentação de API](https://automationexercise.com/api_list) foram consultadas novamente. Os documentos originais do professor continuam ausentes; a aprovação se limita às orientações transcritas, conforme autorizado.

Foram lidas as dez specs, todos os fluxos compartilhados, factory, tipos, API, registro de contas, verificações de suporte, scripts, configurações e workflow. A revisão confrontou ações e asserções com cada passo, além de conferir a sequência numérica da matriz. A aprovação não decorre apenas da existência de arquivos nem de screenshots.

## Revisão funcional

| Caso | Passos conferidos | Verificações decisivas |
|---|---|---|
| TC01 | 18 | Cadastro UI completo, duas opções selecionadas, identidade autenticada, exclusão UI e ausência na API |
| TC02 | 10 | Pré-condição própria por API, login UI, identidade e exclusão UI |
| TC03 | 8 | Conta inexistente, erro específico, sem autenticação |
| TC04 | 10 | Login, logout, rota/formulário de login e ausência de sessão |
| TC05 | 8 | Conta própria existente, duplicidade rejeitada e ausência de avanço |
| TC08 | 9 | Primeiro produto real, rota correspondente, seis informações visíveis, nome/preço consistentes |
| TC09 | 8 | IDs esperados obtidos no catálogo, conjunto completo de resultados e nomes relacionados |
| TC10 | 7 | Rodapé, assinatura com e-mail exclusivo e confirmação específica |
| TC15 | 18 | Cadastro UI antes da compra, dois produtos, quantidades/preços/totais, ambos os endereços, pagamento e exclusão |
| TC16 | 17 | Login UI antes da compra e as mesmas verificações de pedido e limpeza |

O helper de pagamento observa passivamente o submit para conferir a mensagem oficial transitória e também exige a rota e a confirmação final do pedido. A primeira falha histórica do TC15 foi preservada; não houve supressão de erro ou enfraquecimento da asserção.

## Arquitetura, dados e confiabilidade

- Separação entre specs, fluxos, factory, API, tipos e fixtures; funções simples importadas, sem classes ou serviços adicionais.
- Seletores data-qa, IDs, atributos estáveis e texto com escopo. Uso do primeiro item corresponde ao requisito funcional. Produtos de compra têm IDs distintos e dados capturados do catálogo.
- Cypress com isolamento, retries zero e asserções reexecutáveis; varredura e leitura não encontraram only, skip, espera fixa, force indiscriminado, mocks funcionais ou supressão de exceções.
- UUID por usuário, domínio example.com e pagamento fictício. Nenhum dado pessoal/financeiro real nos testes. Preparação API restrita às pré-condições; cadastro, login, compra e exclusão obrigatórios continuam pela UI.
- Registro de propriedade antes da mutação, recusa de colisão e limpeza somente da própria conta. Respostas HTTP e códigos funcionais tratados separadamente. Verificação local do registro aprovada.
- Ao fim das duas rodadas de integração: 38 contas locais registradas e limpas, nenhuma pendente. Interrupção abrupta continua sendo uma limitação documentada.

## Execução e CI

[Resultados por caso e horários](integracao.md): dez aprovados na suíte completa e dez aprovados na rodada inversa, sem falhas, pendências ou skips. Todas as specs também têm execução individual anterior. Isso sustenta independência e estabilidade nas rodadas observadas, sem promessa de disponibilidade futura do site.

Instalação limpa com npm ci, TypeScript, escopo, registro de limpeza e integridade do relatório passaram. O lockfile fixa dependências. O aviso do Node sobre inferência de módulo no script de registro não impediu execução.

[Pipeline real aprovada](https://github.com/matheeeus1/automacao-web-cypress-trabalho-final/actions/runs/41150162138): Ubuntu 24.04, Node da .nvmrc, instalação, verificação do Cypress, TypeScript, dez casos e dois uploads bem-sucedidos. Artifact de relatório baixado e extraído, com HTML/JSON contendo dez aprovações. A falha controlada local fora da suíte final produziu exit 1, erro e screenshot incorporada. O workflow preserva falhas e usa always() para publicação; relatório ausente é erro.

A leitura dos relatórios foi estrutural. A ferramenta de navegador impediu abertura file://; não se declara inspeção visual do HTML. O download e a leitura dos arquivos remotos foram comprovados. Artifacts têm retenção de 30 dias.

## Documentação e entrega

README revisado com instalação, execução, dez casos, estrutura, limpeza, relatórios e acesso aos artifacts. Matriz atualizada para implementação efetiva e links acessíveis no GitHub. Histórico de validações preservado, distinguindo estados anteriores do resultado final.

Repositório público: https://github.com/matheeeus1/automacao-web-cypress-trabalho-final. Commits organizados por etapa, com um commit para cada caso e descrições do trabalho. Não se alteraram datas para simular uma cronologia de commits anterior à autorização.

Dependências, evidências locais e registros de contas estão ignorados pelo Git. Não há arquivo temporário deliberadamente falho na seleção final nem no conteúdo versionado. ZIP é condicional à solicitação do usuário e não foi solicitado.

## Conclusão e limites

**23 requisitos aprovados, 0 pendentes, 0 reprovados, 0 bloqueados.** A referência a 25 no plano era um erro de contagem; a seção 14 do prompt contém 23 itens, todos presentes em [conformidade.md](conformidade.md).

Limitações conhecidas, sem omissão de requisito: documentos do professor ausentes, dependência do site externo, assinatura sem remoção documentada, limpeza sujeita a interrupções e relatórios remotos com prazo de retenção. Não foram encontrados defeitos impeditivos na revisão atual.
