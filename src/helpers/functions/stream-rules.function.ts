import { credentials } from '../../config/credentials';

export const checkStreamRules = () => {
  if (!credentials.userId || !credentials.profileHashtag) {
    throw new Error('Username and hashtag are required');
  }
};
