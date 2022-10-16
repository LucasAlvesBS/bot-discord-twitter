import dotenv from 'dotenv';

dotenv.config();

export const credentials = {
  discordToken: process.env.DISCORD_TOKEN,
  discordHavaianasProfileChannelId:
    process.env.DISCORD_HAVAIANAS_PROFILE_CHANNEL_ID || '',
  discordCommunityHashtagChannelId:
    process.env.DISCORD_COMMUNITY_HASHTAG_CHANNEL_ID || '',
  bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
  havaianasProfileId: process.env.TWITTER_HAVAIANAS_PROFILE_ID,
  havaianasProfileHashtag: process.env.TWITTER_HAVAIANAS_PROFILE_HASHTAG,
  communityHashtag: process.env.TWITTER_COMMUNITY_HASHTAG,
  havaianasTag: process.env.TWITTER_HAVAIANAS_TAG,
  communityTag: process.env.TWITTER_COMMUNITY_TAG,
};
