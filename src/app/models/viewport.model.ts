export enum Device {
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  DesktopMedium = 'DesktopMedium',
  DesktopLarge = 'DesktopLarge'
}

export interface ViewportStatus {
  width: number;
  height: number;
  scrollTop: number;
}
