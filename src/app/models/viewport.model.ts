export enum Device {
  MobileVertical = 'MobileVertical',
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
