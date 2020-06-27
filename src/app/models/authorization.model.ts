import { LocalStorage } from './local-storage.model';

export interface AuthorizationTokenPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthorizationLocalStorage extends LocalStorage {
  token: string;
}
