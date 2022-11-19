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
    const havaianasTag = tag.some(tag => tag === 'havaianas');
    const communityTag = tag.some(tag => tag === 'community');

    if (havaianasTag) {
      const channel = client.channels.cache.get(
        '1029471355080540202',
      ) as TextChannel;

      await channel.send(url);
    } else if (communityTag) {
      const channel = client.channels.cache.get(
        '1030209132478869554',
      ) as TextChannel;

      await channel.send(url);
    }
  } catch (error) {
    throw new Error(errorMessage.CHANNEL_REQUIRED);
  }
};
