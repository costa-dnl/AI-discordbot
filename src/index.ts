import { Client, Collection, GatewayIntentBits, Events } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { prisma } from './services/database.js';

config();

if (!process.env.DISCORD_TOKEN) {
  console.error('Falta DISCORD_TOKEN no .env');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(process.cwd(), 'src', 'commands');
for (const file of fs.readdirSync(commandsPath)) {
  if (!file.match(/\.ts$/)) continue;
  const cmd = await import(`file://${path.join(commandsPath, file)}`);
  if (cmd.data && cmd.execute) {
    client.commands.set(cmd.data.name, cmd);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot online como ${readyClient.user.tag}`);
  for (const guild of readyClient.guilds.cache) {
    console.log(` - ${guild[1].name} (${guild[1].id})`);
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('l')) return;

  const args = message.content.slice('l'.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply('Erro ao executar comando.');
  }
});

client.login(process.env.DISCORD_TOKEN);
