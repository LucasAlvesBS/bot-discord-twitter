import dotenv from 'dotenv';

dotenv.config();

export const credentials = {
  discordToken: process.env.DISCORD_TOKEN,
  discordChannelId: process.env.DISCORD_CHANNEL_ID || '',
  bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
  userId: process.env.TWITTER_USER_ID,
  profileHashtag: process.env.TWITTER_PROFILE_HASHTAG,
};
