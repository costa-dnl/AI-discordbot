import { Message, User } from 'discord.js';
import { prisma } from '../services/database.js';

export const data = {
  name: 'saldo',
  description: 'Consulta saldo próprio ou de outro usuário.',
};

export async function execute(message: Message, args: string[]) {
  let targetUserId: string | null = null;

  if (args.length > 0) {
    const mention = message.mentions.users.first();
    if (mention) {
      targetUserId = mention.id;
    } else {
      targetUserId = args[0];
    }
  } else {
    targetUserId = message.author.id;
  }

  if (!targetUserId) {
    await message.reply('Uso: `lsaldo` ou `lsaldo @usuario` ou `lsaldo <id>`');
    return;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { discordId: targetUserId },
    select: { username: true, saldo: true },
  });

  await message.reply(
    `Saldo de ${usuario?.username ?? targetUserId}: ${usuario?.saldo ?? 0}`
  );
}
