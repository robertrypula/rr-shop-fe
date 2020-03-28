export enum Size {
  Full = 'Full',
  Px0064 = 'Px0064',
  Px0200 = 'Px0200',
  Px0300 = 'Px0300',
  Px1600 = 'Px1600'
}

// -----------------------------------------------------------------------------

export interface Image {
  id: number;
  filename: string;
  sortOrder: number;
}
