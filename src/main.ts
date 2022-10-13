import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { credentials } from './config/credentials';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel],
});

if (!credentials.discordToken) {
  throw new Error('Token invalid');
}

client.login(credentials.discordToken);

client.on('ready', () => {
  console.log('Discord ready to start');
});
