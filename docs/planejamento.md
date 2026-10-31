# Planejamento aprovado — Fases 0 e 1

Este registro resume o plano aprovado na conversa. O histórico Git foi organizado retrospectivamente, após a implementação e as execuções locais, com autorização do usuário. As datas dos commits representam seu registro, não a data original de cada etapa. As evidências de execução são documentadas separadamente.

## Diagnóstico inicial

Workspace sem projeto anterior, sem commits e sem remoto. Documentos originais do professor ausentes; requisitos transcritos são a referência acadêmica. Acesso de rede pelo terminal e execução do Cypress exigiram validação do ambiente.

## Escopo e arquitetura

Exatamente TC01, TC02, TC03, TC04, TC05, TC08, TC09, TC10, TC15 e TC16, nessa ordem de implementação, com um teste completo por spec. Cypress com TypeScript estrito, funções compartilhadas por fluxo, factories de dados fictícios, preparação e limpeza por API e pagamento sintético. API não substitui etapas funcionais obrigatórias da interface.

Seletores próprios para testes quando disponíveis, sincronização por condições observáveis, isolamento habilitado e retries de teste desabilitados. Não utilizar skips, only, esperas fixas ou supressão global de erros. Rastrear cada passo oficial até sua implementação e execução.

## Etapas e critérios

| Fase | Entrega e aceite |
|---|---|
| 0–1 | Diagnóstico, arquitetura, escopo, dados e planejamento aprovados |
| 2 | Estrutura, dependências reproduzíveis, configuração, binário e TypeScript verificados |
| 3 | API, factory, registro de contas, limpeza e fluxos compartilhados validados |
| 4 | Dez cenários implementados e executados individualmente, com matriz de passos |
| 5 | Mochawesome HTML/JSON, falha controlada, workflow real e download de artifacts |
| 6 | Duas execuções completas, incluindo ordem alternativa, com limpeza e independência |
| 7 | Auditoria funcional, técnica, arquitetural, documental e de CI |

## Evidências e limites

Relatórios, screenshots, vídeos e logs ficam em artifacts, ignorados pelo Git. Contas sintéticas têm identidade exclusiva e registro recuperável; interrupções podem impedir hooks. Assinatura não possui remoção documentada. Falhas da aplicação externa devem permanecer visíveis.

O usuário autorizou avanço automático após sucesso de cada etapa e, posteriormente, commits separados, push e execução da pipeline. A publicação ainda depende de um destino definido. Nenhuma pipeline poderá ser aprovada sem execução real e conferência dos artifacts.
