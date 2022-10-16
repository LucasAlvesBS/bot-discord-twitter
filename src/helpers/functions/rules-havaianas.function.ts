import { credentials } from '@config/credentials';
import { errorMessage } from '@helpers/messages/error.message';

export const checkRulesForHavaianasProfile = () => {
  if (
    !credentials.havaianasProfileId ||
    !credentials.havaianasProfileHashtag ||
    !credentials.communityHashtag
  ) {
    throw new Error(errorMessage.ID_HASHTAG_REQUIRED);
  }
};
