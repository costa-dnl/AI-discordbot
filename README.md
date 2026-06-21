# Bot Discord — ai-discordbot

Stack: Node.js 18+ + discord.js v14

## Estrutura
```
src/
  index.js              # Ponto de entrada
  commands/             # Slash commands
    ping.js
    ola.js
  events/               # Eventos do cliente
  handlers/             # Handlers reutilizáveis
  utils/                # Utilitários gerais
  services/             # Regras de negócio / integrações
```

## Configuração
1. Crie `.env` baseado em `.env.example`
2. Registre os slash commands no Discord Developer Portal (veja abaixo)

## Comandos locais
- `npm start` — roda o bot
- `npm run dev` — roda com auto-reload (`--watch`)

## Registrar slash commands (requer CLIENT_ID)
```bash
node -e "
import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config();
const rest = new REST().setToken(process.env.DISCORD_TOKEN);
const commands = [];
const dir = path.join(process.cwd(), 'src', 'commands');
for (const f of fs.readdirSync(dir)) if (f.endsWith('.js')) {
  const cmd = (await import('file://' + path.join(dir, f))).default || {};
  if (cmd.data) commands.push(cmd.data.toJSON());
}
(async () => {
  console.log('Registrando...');
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  console.log('Pronto!');
})();
"
```
