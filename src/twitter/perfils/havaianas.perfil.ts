import { credentials } from '../../config/credentials';
import { sendFromHavaianasToDiscord } from '../../discord/send-havaianas';
import { checkStreamRules } from '../../helpers/functions/stream-rules.function';
import { Client } from 'discord.js';
import { ETwitterStreamEvent, TwitterApi } from 'twitter-api-v2';

const twitter = new TwitterApi(credentials.bearerToken);

const roTwitter = twitter.readOnly;
const twitterV2 = roTwitter.v2;

export const watchHavaianasTimeline = async (client: Client) => {
  try {
    console.log('Watching twitter in real time...');
    const rules = await twitterV2.streamRules();
    if (rules.data?.length) {
      await twitterV2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) },
      });
    }

    await twitterV2.updateStreamRules({
      add: [
        {
          value: `from: ${credentials.userId} #${credentials.profileHashtag}`,
          tag: 'havaianas',
        },
      ],
    });

    checkStreamRules();

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

      sendFromHavaianasToDiscord(tweet, client);
    });
  } catch (error) {
    console.warn('Stream disconnected with error. Retrying.', error);
    watchHavaianasTimeline(client);
  }
};
