import { Message } from 'discord.js';

export const data = {
  name: 'ping',
  description: 'Mostra latência do bot.',
};

export async function execute(message: Message, _args: string[]) {
  const ping = Date.now() - message.createdTimestamp;
  await message.reply(`Pong! ${ping}ms`);
}
