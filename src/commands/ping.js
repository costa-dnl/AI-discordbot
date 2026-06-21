export const data = {
  name: 'ping',
  description: 'Responde com Pong!',
};

export async function execute(interaction) {
  await interaction.reply('Pong!');
}
