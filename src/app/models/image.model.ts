export enum ImageSize {
  Full = 'full',
  Thumb075px = 'thumb-075px',
  Thumb200px = 'thumb-200px'
}

export interface Image {
  id: number;
  name: string;
  order: number;
}
