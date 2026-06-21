export const data = {
  name: 'ping',
  description: 'Responde com Pong e mostra a latência.',
};

export async function execute(message) {
  const ping = Date.now() - message.createdTimestamp;
  await message.reply(`Pong! ${ping}ms`);
}
