# Lyra — Guia Principal

## Regras do Operador
1. Commit apenas quando necessário (não spammar commits)
2. Sempre reiniciar o bot após mudanças e verificar se está saudável
3. Reportar erros em <#1518156757275381922> com 🔴
4. Reportar status OK / console.log relevante em <#1518156757275381922> com 🟢

## Estrutura
```
C:\devs\AI-discordbot\
├── src\                     # Código do bot
│   ├── index.js             # Entrada principal
│   ├── commands\            # Comandos por texto (prefixo l)
│   ├── events\              # Eventos do cliente
│   ├── handlers\            # Handlers de mensagens/interações
│   └── utils\               # Utilitários
├── lyra-nucleo\             # Núcleo evolutivo do Lyra
│   ├── AGENTS.md            # Este guia
│   ├── agents\              # Agentes de IA
│   ├── memories\            # Memórias persistentes
│   └── contexto\            # Contextos de conversa
└── changelog\               # Registro de mudanças (ignorado no git)
```

## Comandos
- Prefixo: `l`
- Exemplos: `lping`, `lajuda`, `lsaldo`

## Convenções
- NÃO use slash commands; tudo via prefixo `l`
- Mudanças relevantes devem ser registradas em `changelog/`
- Este diretório (`lyra-nucleo/`) é para evolução contínua do bot
