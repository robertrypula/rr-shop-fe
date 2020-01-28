import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Device, ViewportStatus } from '../models/viewport.model';
import {
  GRID_DESKTOP_LARGE,
  GRID_DESKTOP_MEDIUM,
  GRID_TABLET,
  HEADER_FIXED_DESKTOP_LARGE_THRESHOLD,
  HEADER_FIXED_DESKTOP_MEDIUM_THRESHOLD,
  HEADER_FIXED_MOBILE_THRESHOLD,
  HEADER_FIXED_TABLET_THRESHOLD
} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public device$: Subject<Device> = new Subject();
  public scrolledDownThatHeaderIsNotVisible$: Subject<boolean> = new Subject();
  public viewportStatus$: Subject<ViewportStatus> = new Subject();

  public constructor() {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(tap(this.update.bind(this)))
      .subscribe();
    fromEvent(window, 'resize', { passive: true })
      .pipe(tap(this.update.bind(this)))
      .subscribe();

    this.update();
  }

  protected update(): void {
    const viewportStatus: ViewportStatus = this.getViewportStatus();
    const device: Device = this.getDevice(viewportStatus);
    const scrolledDownThatHeaderIsNotVisible: boolean = this.getScrolledDownThatHeaderIsNotVisible(
      viewportStatus.scrollTop,
      device
    );

    this.device$.next(device);
    this.scrolledDownThatHeaderIsNotVisible$.next(scrolledDownThatHeaderIsNotVisible);
    this.viewportStatus$.next(viewportStatus);
  }

  protected getDevice(viewportStatus: ViewportStatus): Device {
    let device: Device;

    if (viewportStatus.width >= GRID_DESKTOP_LARGE) {
      device = Device.DesktopLarge;
    } else if (viewportStatus.width >= GRID_DESKTOP_MEDIUM) {
      device = Device.DesktopMedium;
    } else if (viewportStatus.width >= GRID_TABLET) {
      device = Device.Tablet;
    } else {
      device = Device.Mobile;
    }

    return device;
  }

  protected getScrolledDownThatHeaderIsNotVisible(scrollTop: number, device: Device): boolean {
    let result = false;

    switch (device) {
      case Device.Mobile:
        result = scrollTop > HEADER_FIXED_MOBILE_THRESHOLD;
        break;
      case Device.Tablet:
        result = scrollTop > HEADER_FIXED_TABLET_THRESHOLD;
        break;
      case Device.DesktopMedium:
        result = scrollTop > HEADER_FIXED_DESKTOP_MEDIUM_THRESHOLD;
        break;
      case Device.DesktopLarge:
        result = scrollTop > HEADER_FIXED_DESKTOP_LARGE_THRESHOLD;
        break;
    }

    return result;
  }

  public getViewportStatus(): ViewportStatus {
    const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
    const width: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    return {
      height,
      width,
      scrollTop
    };
  }
}
