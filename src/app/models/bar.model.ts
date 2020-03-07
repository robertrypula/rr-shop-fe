export enum BarType {
  Error = 'Error',
  Success = 'Success'
}

export interface Bar {
  id: number;
  type: BarType;
  message: string;
}
