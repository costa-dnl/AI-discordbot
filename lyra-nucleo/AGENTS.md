# Lyra — Guia Principal

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
- Exemplos: `lping`, `lola`, `lajuda`

## Convenções
- NÃO use slash commands; tudo via prefixo `l`
- Mudanças relevantes devem ser registradas em `changelog/`
- Este diretório (`lyra-nucleo/`) é para evolução contínua do bot
