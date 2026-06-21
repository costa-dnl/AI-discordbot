export const data = {
  name: 'ola',
  description: 'Responde com uma saudação em português.',
};

export async function execute(interaction) {
  await interaction.reply(`Olá, ${interaction.user.username}!`);
}
