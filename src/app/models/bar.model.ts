export enum BarType {
  Error = 'Error',
  Notification = 'Notification',
  Success = 'Success'
}

// -----------------------------------------------------------------------------

export interface BarStore {
  id: number;
  barType: BarType;
  message: string;
}

// -----------------------------------------------------------------------------

export class Bar implements BarStore {
  public id: number;
  public barType: BarType;
  public message: string;

  public fromStore(barStore: BarStore): Bar {
    if (!barStore) {
      throw new Error('Empty store object');
    }

    this.id = barStore.id;
    this.barType = barStore.barType;
    this.message = barStore.message;

    return this;
  }
}
