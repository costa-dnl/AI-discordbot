import { Client, Collection, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

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
  if (!file.match(/\.js$/)) continue;
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

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    await interaction.reply({ content: 'Comando não encontrado.', ephemeral: true });
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Erro ao executar comando.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
