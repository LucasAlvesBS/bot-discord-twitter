import { credentials } from '../config/credentials';
import { Client, TextChannel } from 'discord.js';
import { TweetV2SingleStreamResult } from 'twitter-api-v2';

export const sendFromHavaianasToDiscord = async (
  tweet: TweetV2SingleStreamResult,
  client: Client,
) => {
  const url =
    'https://twitter.com/' +
    tweet.includes?.users?.map(user => user.username) +
    '/status/' +
    tweet.data.id;
  try {
    const channel = client.channels.cache.get(
      credentials.discordChannelId,
    ) as TextChannel;
    await channel.send(url);
  } catch (error) {
    console.error(error);
  }
};
