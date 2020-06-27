export enum LocalStorageKey {
  Authorization = 'Authorization',
  Bar = 'Bar',
  Order = 'Order'
}

export interface LocalStorage {
  localStorageKey: LocalStorageKey;
}
