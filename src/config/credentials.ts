import dotenv from 'dotenv';

dotenv.config();

export const credentials = {
  discordToken: process.env.DISCORD_TOKEN,
  twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || '',
};
