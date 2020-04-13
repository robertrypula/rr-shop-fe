export enum SizeImage {
  Full = 'Full',
  Px0128 = 'Px0128',
  Px0400 = 'Px0400',
  Px0600 = 'Px0600',
  Px1600 = 'Px1600'
}

export enum SizeImageContainer {
  Px0064 = 'Px0128',
  Px0200 = 'Px0400',
  Px0300 = 'Px0600'
}

export enum Transparency {
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

// -----------------------------------------------------------------------------

export interface Image {
  id: number;
  filename: string;
  sortOrder: number;
}
