export enum Device {
  MobileVertical = 'MobileVertical',
  MobileHorizontal = 'MobileHorizontal',
  Tablet = 'Tablet',
  DesktopMedium = 'DesktopMedium',
  DesktopLarge = 'DesktopLarge',
  DesktopExtraLarge = 'DesktopExtraLarge'
}

export interface ViewportStatus {
  width: number;
  height: number;
  scrollTop: number;
}
