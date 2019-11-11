export enum BarType {
  Success = 'Success'
}

export interface Bar {
  id: number;
  type: BarType;
  message: string;
}
