import { credentials } from '@config/credentials';
import { checkDiscordToken } from '@helpers/functions/discord-token.function';
import { watchHavaianasTimeline } from '@twitter/perfils/havaianas.perfil';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel],
});

checkDiscordToken();

client.login(credentials.discordToken);

client.on('ready', () => {
  console.log('Discord ready to start');
  watchHavaianasTimeline(client);
});
