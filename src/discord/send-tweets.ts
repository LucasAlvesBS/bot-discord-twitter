import { credentials } from '@config/credentials';
import { errorMessage } from '@helpers/messages/error.message';
import { Client, TextChannel } from 'discord.js';
import { TweetV2SingleStreamResult } from 'twitter-api-v2';

export const sendTweetsToDiscord = async (
  tweet: TweetV2SingleStreamResult,
  client: Client,
) => {
  const username = tweet.includes?.users?.map(user => user.username).shift();
  const url = 'https://twitter.com/' + username + '/status/' + tweet.data.id;

  try {
    const tag = tweet.matching_rules.map(rule => rule.tag);
    const havaianasTag = tag.some(tag => tag === credentials.havaianasTag);
    const communityTag = tag.some(tag => tag === credentials.communityTag);

    if (havaianasTag) {
      const channel = client.channels.cache.get(
        credentials.discordHavaianasProfileChannelId,
      ) as TextChannel;

      await channel.send(url);
    } else if (communityTag) {
      const channel = client.channels.cache.get(
        credentials.discordCommunityHashtagChannelId,
      ) as TextChannel;

      await channel.send(url);
    }
  } catch (error) {
    throw new Error(errorMessage.CHANNEL_REQUIRED);
  }
};
