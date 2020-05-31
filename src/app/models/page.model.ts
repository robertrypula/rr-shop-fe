export enum ApiCall {
  Initial = 'Initial',
  Request = 'Request',
  Success = 'Success',
  Failure = 'Failure'
}

export interface RrShopWindow extends Window {
  RR_SHOP_GA_MEASUREMENT_ID: string;
  gtag(...args: any): void;
}
