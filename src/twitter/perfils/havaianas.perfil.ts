import { credentials } from '@config/credentials';
import { Client, TextChannel } from 'discord.js';
import {
  ETwitterStreamEvent,
  TweetV2SingleStreamResult,
  TwitterApi,
} from 'twitter-api-v2';

const twitter = new TwitterApi(credentials.bearerToken);

const roTwitter = twitter.readOnly;
const twitterV2 = roTwitter.v2;

export const watchHavaianasTimeline = async (client: Client) => {
  try {
    console.log('Setting up Twitter...');
    const rules = await twitterV2.streamRules();
    if (rules.data?.length) {
      await twitterV2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) },
      });
    }

    await twitterV2.updateStreamRules({
      add: [
        {
          value: `from: ${credentials.username} #${credentials.profileHashtag}`,
          tag: 'havaianas',
        },
      ],
    });

    const stream = await twitterV2.searchStream({
      'tweet.fields': ['referenced_tweets', 'author_id'],
      expansions: ['referenced_tweets.id', 'entities.mentions.username'],
    });

    stream.autoReconnect = true;

    stream.on(ETwitterStreamEvent.Data, async tweet => {
      console.log(tweet);

      const isRtOrReplyOrQuote =
        tweet.data.referenced_tweets?.some(
          tweet =>
            tweet.type === 'retweeted' ||
            tweet.type === 'replied_to' ||
            tweet.type === 'quoted',
        ) ?? false;

      if (isRtOrReplyOrQuote) {
        return;
      }

      sendMessage(tweet, client);
    });

    const sendMessage = async (
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
  } catch (error) {
    console.warn('Stream disconnected with error 429. Retrying.');
    watchHavaianasTimeline(client);
  }
};
