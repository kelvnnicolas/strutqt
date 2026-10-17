# Eventos, métricas e entregas

Este documento é o contrato entre quem **emite** eventos (páginas públicas dos fluxos), quem **consome** (métricas e integrações) e o banco (`Event`, `Delivery`). Mudou o formato? Aumente `schemaVersion` e registre aqui.

## Princípios

1. **O evento é a fonte da verdade.** `Submission` e `Lead` são estado derivado e podem ser reconstruídos a partir dos eventos.
2. **Imutável.** Evento nunca é atualizado, a não ser `processedAt`.
3. **Idempotente.** `(workspaceId, idempotencyKey)` é único. Reenviar a mesma ação (retentativa, duplo clique) devolve o evento já existente em vez de criar outro.
4. **Uma definição por métrica.** Todas as telas leem a mesma consulta (tabela abaixo); ninguém recalcula por conta própria.

## Envelope

| Campo | Observação |
|---|---|
| `id` | UUID gerado pelo servidor |
| `workspaceId`, `flowId`, `flowVersionId`, `submissionId` | Sempre filtrar por `workspaceId` |
| `type` | Um dos tipos abaixo; lista fechada (enum `EventType`) |
| `idempotencyKey` | Determinística por ação, ex.: `${submissionId}:step:${stepKey}` |
| `occurredAt` / `receivedAt` | Quando aconteceu e quando chegou. Métricas usam `occurredAt` |
| `schemaVersion` | Versão do `payload` (hoje 1) |
| `payload` | JSON específico do tipo |

## Catálogo (v1)

| Tipo | Quando | `payload` | Chave de idempotência |
|---|---|---|---|
| `FLOW_VIEWED` | Visitante abre a página do fluxo | `visitorId`, `utm*`, `referrer` | `view:${visitorId}:${flowId}:${yyyymmddHH}` (uma por hora) |
| `FLOW_STARTED` | Primeira resposta da submissão | `visitorId` | `${submissionId}:started` |
| `STEP_ANSWERED` | Cada passo respondido | `stepKey`, `answer`, `scoreDelta` | `${submissionId}:step:${stepKey}` |
| `FLOW_COMPLETED` | Último passo concluído | `score` | `${submissionId}:completed` |
| `LEAD_CAPTURED` | Formulário de contato enviado | `leadId` (sem dados pessoais) | `${submissionId}:lead` |
| `LEAD_QUALIFIED` / `LEAD_DISQUALIFIED` | Pontuação comparada ao limite do fluxo | `score`, `threshold` | `${submissionId}:qualification` |

**Dados pessoais** (nome, e-mail, telefone) ficam em `Lead`, não no `payload`, para que o histórico de eventos possa ser mantido sem reter PII. A entrega de integração busca o lead pelo `leadId`.

## Métricas (definições)

| Métrica | Definição |
|---|---|
| Visitantes | `COUNT(DISTINCT visitorId)` de `FLOW_VIEWED` no período |
| Inícios | `COUNT(DISTINCT submissionId)` de `FLOW_STARTED` |
| Conclusões | `COUNT(DISTINCT submissionId)` de `FLOW_COMPLETED` |
| Leads | `COUNT(*)` de `LEAD_CAPTURED` |
| Leads qualificados | `COUNT(*)` de `LEAD_QUALIFIED` |
| Taxa de conversão | Leads ÷ Visitantes |
| Taxa de qualificação | Qualificados ÷ Leads |
| Abandono por passo | Submissões que responderam o passo N e não o N+1 |

Período é sempre por `occurredAt`, no fuso do workspace. Eventos duplicados já são impedidos pela chave de idempotência, então as contagens simples não precisam de `DISTINCT` por evento.

## Entrega para integrações

1. Ao gravar um evento, cria-se uma `Delivery` (`PENDING`) para cada `Integration` ativa que assina aquele `type`.
2. Um worker (fila durável) envia `POST` ao `url` com o corpo `{ id, type, occurredAt, schemaVersion, data }` e o cabeçalho `X-Struqt-Signature: sha256=<HMAC do corpo com o segredo>`.
3. Resposta 2xx → `SUCCEEDED`. Qualquer outra → `FAILED` com `nextAttemptAt` por recuo exponencial; ao esgotar as tentativas → `DEAD`.
4. O destino deve tratar o `id` do evento como chave de idempotência (a entrega é *pelo menos uma vez*).
