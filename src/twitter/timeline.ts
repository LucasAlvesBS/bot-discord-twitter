import { credentials } from '@config/credentials';
import { sendTweetsToDiscord } from '@discord/shipping';
import { filterUrl } from '@helpers/functions/filter-url.function';
import { checkRulesForHavaianasProfile } from '@helpers/functions/rules-havaianas.function';
import { errorMessage } from '@helpers/messages/error.message';
import { Client } from 'discord.js';
import { ETwitterStreamEvent } from 'twitter-api-v2';
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
          value: `from: ${credentials.havaianasProfileId} #${credentials.havaianasProfileHashtag}`,
          tag: credentials.havaianasTag,
        },
        {
          value: `#${credentials.communityHashtag}`,
          tag: credentials.communityTag,
        },
      ],
    });

    checkRulesForHavaianasProfile();

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
    console.warn(errorMessage.STREAM_DISCONNECT, error);
    watchTwitterTimeline(client);
  }
};
