import { sendTweetsToDiscord } from '@discord/send-tweets';
import { filterUrl } from '@helpers/functions/filter-url.function';
import { sleep } from '@helpers/functions/sleep.function';
import { errorMessage } from '@helpers/messages/error.message';
import { Client } from 'discord.js';
import { ApiResponseError, ETwitterStreamEvent } from 'twitter-api-v2';
import { twitterV2 } from './twitter-api';

export const watchTwitterTimeline = async (client: Client) => {
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
          value: 'from: 1578032491704614914 #nfttestediamante',
          tag: 'havaianas',
        },
        {
          value: '#nfttestandobem',
          tag: 'community',
        },
      ],
    });

    const stream = await twitterV2.searchStream({
      'tweet.fields': [
        'referenced_tweets',
        'author_id',
        'possibly_sensitive',
        'entities',
      ],
      expansions: ['referenced_tweets.id', 'entities.mentions.username'],
    });

    stream.autoReconnect = true;
    stream.autoReconnectRetries = Infinity;

    stream.on(ETwitterStreamEvent.Data, async tweet => {
      console.log(tweet);

      const urlFiltered = filterUrl(tweet);

      if (urlFiltered !== null && urlFiltered !== undefined) {
        return;
      }

      if (tweet.data.possibly_sensitive === true) {
        return;
      }

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

      sendTweetsToDiscord(tweet, client);
    });
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.rateLimitError &&
      error.rateLimit
    ) {
      const resetTimeout = error.rateLimit.reset * 1000;
      const timeToWait = resetTimeout - Date.now();

      await sleep(timeToWait);
      watchTwitterTimeline(client);
    } else {
      console.warn(errorMessage.STREAM_DISCONNECT, error);
      watchTwitterTimeline(client);
    }
  }
};
