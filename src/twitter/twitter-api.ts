import { credentials } from '@config/credentials';
import { checkBearerToken } from '@helpers/functions/bearer-token.function';
import { TwitterApi } from 'twitter-api-v2';

const twitter = new TwitterApi(credentials.bearerToken);

checkBearerToken();

const roTwitter = twitter.readOnly;
export const twitterV2 = roTwitter.v2;
