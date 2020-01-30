import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { Device, ViewportStatus } from '../models/viewport.model';
import {
  GRID_DESKTOP_LARGE,
  GRID_DESKTOP_MEDIUM,
  GRID_MOBILE,
  GRID_TABLET,
  HEADER_FIXED_DESKTOP_LARGE_THRESHOLD,
  HEADER_FIXED_DESKTOP_MEDIUM_THRESHOLD,
  HEADER_FIXED_MOBILE_THRESHOLD,
  HEADER_FIXED_MOBILE_VERTICAL_THRESHOLD,
  HEADER_FIXED_TABLET_THRESHOLD
} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public device$: Observable<Device>;
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean>;
  public viewportStatus$: Observable<ViewportStatus>;

  protected deviceSubject$: Subject<Device> = new Subject();
  protected scrolledDownThatHeaderIsNotVisibleSubject$: Subject<boolean> = new Subject();
  protected viewportStatusSubject$: Subject<ViewportStatus> = new Subject();

  public constructor() {
    this.device$ = this.deviceSubject$.asObservable().pipe(distinctUntilChanged());
    this.scrolledDownThatHeaderIsNotVisible$ = this.scrolledDownThatHeaderIsNotVisibleSubject$
      .asObservable()
      .pipe(distinctUntilChanged());
    this.viewportStatus$ = this.viewportStatusSubject$.asObservable().pipe(distinctUntilChanged());

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
    const device: Device = this.getDevice(viewportStatus.width);
    const scrolledDownThatHeaderIsNotVisible: boolean = this.getScrolledDownThatHeaderIsNotVisible(
      viewportStatus.scrollTop,
      device
    );

    this.deviceSubject$.next(device);
    this.scrolledDownThatHeaderIsNotVisibleSubject$.next(scrolledDownThatHeaderIsNotVisible);
    this.viewportStatusSubject$.next(viewportStatus);
  }

  protected getDevice(width: number): Device {
    let device: Device;

    if (width < GRID_MOBILE) {
      device = Device.MobileVertical;
    } else if (width < GRID_TABLET) {
      device = Device.Mobile;
    } else if (width < GRID_DESKTOP_MEDIUM) {
      device = Device.Tablet;
    } else if (width < GRID_DESKTOP_LARGE) {
      device = Device.DesktopMedium;
    } else {
      device = Device.DesktopLarge;
    }

    return device;
  }

  protected getScrolledDownThatHeaderIsNotVisible(scrollTop: number, device: Device): boolean {
    let result = false;

    switch (device) {
      case Device.MobileVertical:
        result = scrollTop > HEADER_FIXED_MOBILE_VERTICAL_THRESHOLD;
        break;
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
