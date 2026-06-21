import { Events } from 'discord.js';

export default function registerReady(client) {
  client.once(Events.ClientReady, () => {
    console.log(`Bot online como ${client.user.tag}`);
  });
}
