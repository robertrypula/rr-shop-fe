export enum ApiCall {
  Initial = 'Initial',
  Request = 'Request',
  Success = 'Success',
  Failure = 'Failure'
}

// tslint:disable-next-line:no-empty-interface
export interface RrShopDocument extends Document {}

export interface RrShopWindow extends Window {
  onInPostParcelLockerChange: any; // TODO refactor it for Server Side Rendering
  openInPostParcelLockerModal: any; // TODO refactor it for Server Side Rendering
  // ---
  RR_SHOP_GA_MEASUREMENT_ID: string;
  gtag(...args: any): void;
}
