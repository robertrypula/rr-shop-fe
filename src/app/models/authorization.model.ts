export interface AuthorizationTokenPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}
