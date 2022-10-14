import { credentials } from '@config/credentials';

export const checkBearerToken = () => {
  if (credentials.bearerToken === '') {
    throw new Error('Token invalid');
  }
};
