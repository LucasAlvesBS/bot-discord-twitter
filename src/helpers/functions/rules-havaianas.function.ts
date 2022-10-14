import { credentials } from '@config/credentials';

export const checkRulesForHavaianasProfile = () => {
  if (
    !credentials.havaianasProfileId ||
    !credentials.havaianasProfileHashtag ||
    !credentials.communityHashtag
  ) {
    throw new Error('The profile id and the hashtag are required');
  }
};
