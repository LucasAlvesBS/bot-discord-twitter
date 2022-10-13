import { credentials } from '@config/credentials';

export const checkDiscordToken = () => {
  if (!credentials.discordToken) {
    throw new Error('Token invalid');
  }
};
