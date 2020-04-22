export enum AdminCallState {
  Initial = 'Initial',
  Request = 'Request',
  Success = 'Success',
  Failure = 'Failure'
}

export interface AdminCall<T = any> {
  adminCallState: AdminCallState;
  data: T;
  errorDetails: any;
}
