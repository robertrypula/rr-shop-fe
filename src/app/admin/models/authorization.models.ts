export interface AuthorizationRequestBody {
  username: string;
  password: string;
}

export interface AuthorizationResponseBody {
  token: string;
}
