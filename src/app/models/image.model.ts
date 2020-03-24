export enum Size {
  Full = 'Full',
  Thumb064px = 'Thumb064px',
  Thumb200px = 'Thumb200px',
  Thumb300px = 'Thumb300px'
}

// -----------------------------------------------------------------------------

export interface Image {
  id: number;
  filename: string;
  sortOrder: number;
}
