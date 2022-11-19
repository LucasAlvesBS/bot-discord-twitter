import { credentials } from '@config/credentials';
import { errorMessage } from '@helpers/messages/error.message';

export const checkBearerToken = () => {
  if (credentials.twitterBearerToken === '') {
    throw new Error(errorMessage.INVALID_TOKEN);
  }
};
