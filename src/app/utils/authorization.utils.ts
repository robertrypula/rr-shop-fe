import * as jwtDecode from 'jwt-decode';

import { AuthorizationTokenPayload } from '../models/authorization.model';

export const getExpirationTime = (token: string): number => {
  try {
    const authorizationTokenPayload: AuthorizationTokenPayload = jwtDecode(token);

    return authorizationTokenPayload.exp ? authorizationTokenPayload.exp : null;
  } catch (e) {
    return null;
  }
};

export const getExpirationSeconds = (expirationTime: number): number => {
  return expirationTime ? expirationTime - Math.round(Date.now() / 1000) : null;
};
