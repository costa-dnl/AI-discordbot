import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

if (!process.env.DISCORD_TOKEN) {
  console.error('Falta DISCORD_TOKEN no .env');
  process.exit(1);
}

client.commands = new Collection();

const commandsPath = path.join(process.cwd(), 'src', 'commands');
for (const dir of fs.readdirSync(commandsPath)) {
  const file = path.join(commandsPath, dir);
  if (!file.match(/\.[mc]?js$/)) continue;
  const cmd = await import(`file://${file}`);
  if (cmd.data && cmd.execute) {
    client.commands.set(cmd.data.name, cmd);
  }
}

export { client };
