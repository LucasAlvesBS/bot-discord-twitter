import { forbiddenUrl } from '@helpers/urls/forbidden.url';
import { TweetV2SingleStreamResult } from 'twitter-api-v2';

export const filterUrl = (tweet: TweetV2SingleStreamResult) => {
  if (tweet.data.entities?.urls) {
    const expandedUrl = tweet.data.entities?.urls.map(a => a.expanded_url);
    const link = expandedUrl?.shift();
    const regex = new RegExp(forbiddenUrl.join('|'), 'g');
    const filterUrl = link?.match(regex);
    return filterUrl;
  }
};
