import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import {
  GRID_DESKTOP_EXTRA_LARGE,
  GRID_DESKTOP_LARGE,
  GRID_DESKTOP_MEDIUM,
  GRID_MOBILE_HORIZONTAL,
  GRID_TABLET,
  HEADER_STICKY_DESKTOP_EXTRA_LARGE_THRESHOLD,
  HEADER_STICKY_DESKTOP_LARGE_THRESHOLD,
  HEADER_STICKY_DESKTOP_MEDIUM_THRESHOLD,
  HEADER_STICKY_MOBILE_HORIZONTAL_THRESHOLD,
  HEADER_STICKY_MOBILE_VERTICAL_THRESHOLD,
  HEADER_STICKY_TABLET_THRESHOLD
} from '../config';
import { ViewportFacadeService } from '../store/facades/viewport-facade.service';
import { Device, ViewportStatus } from '../models/viewport.model';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public isScrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.viewportFacadeService
    .isScrolledDownThatHeaderIsNotVisible$;
  public viewportStatus$: Observable<ViewportStatus>;

  protected deviceSubject$: Subject<Device> = new Subject();
  protected isScrolledDownThatHeaderIsNotVisibleSubject$: Subject<boolean> = new Subject();
  protected viewportStatusSubject$: Subject<ViewportStatus> = new Subject();

  // TODO try to migrate things to facade
  public constructor(protected viewportFacadeService: ViewportFacadeService) {
    this.viewportStatus$ = this.viewportStatusSubject$.asObservable().pipe(distinctUntilChanged());
    this.configureStoreActionsDispatching();
    this.attachWindowEvents();
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

  protected attachWindowEvents(): void {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(tap(this.update.bind(this)))
      .subscribe();
    fromEvent(window, 'resize', { passive: true })
      .pipe(tap(this.update.bind(this)))
      .subscribe();

    this.update();
  }

  protected configureStoreActionsDispatching(): void {
    this.deviceSubject$
      .asObservable()
      .pipe(distinctUntilChanged())
      .subscribe((device: Device): void => this.viewportFacadeService.setDevice(device));

    this.isScrolledDownThatHeaderIsNotVisibleSubject$
      .asObservable()
      .pipe(distinctUntilChanged())
      .subscribe((isScrolledDownThatHeaderIsNotVisible: boolean): void =>
        this.viewportFacadeService.setIsScrolledDownThatHeaderIsNotVisible(isScrolledDownThatHeaderIsNotVisible)
      );
  }

  protected getDevice(width: number): Device {
    let device: Device;

    if (width < GRID_MOBILE_HORIZONTAL) {
      device = Device.MobileVertical;
    } else if (width < GRID_TABLET) {
      device = Device.MobileHorizontal;
    } else if (width < GRID_DESKTOP_MEDIUM) {
      device = Device.Tablet;
    } else if (width < GRID_DESKTOP_LARGE) {
      device = Device.DesktopMedium;
    } else if (width < GRID_DESKTOP_EXTRA_LARGE) {
      device = Device.DesktopLarge;
    } else {
      device = Device.DesktopExtraLarge;
    }

    return device;
  }

  protected getScrolledDownThatHeaderIsNotVisible(scrollTop: number, device: Device): boolean {
    let result = false;

    switch (device) {
      case Device.MobileVertical:
        result = scrollTop >= HEADER_STICKY_MOBILE_VERTICAL_THRESHOLD;
        break;
      case Device.MobileHorizontal:
        result = scrollTop >= HEADER_STICKY_MOBILE_HORIZONTAL_THRESHOLD;
        break;
      case Device.Tablet:
        result = scrollTop >= HEADER_STICKY_TABLET_THRESHOLD;
        break;
      case Device.DesktopMedium:
        result = scrollTop >= HEADER_STICKY_DESKTOP_MEDIUM_THRESHOLD;
        break;
      case Device.DesktopLarge:
        result = scrollTop >= HEADER_STICKY_DESKTOP_LARGE_THRESHOLD;
        break;
      case Device.DesktopExtraLarge:
        result = scrollTop >= HEADER_STICKY_DESKTOP_EXTRA_LARGE_THRESHOLD;
        break;
    }

    return result;
  }

  protected update(): void {
    const viewportStatus: ViewportStatus = this.getViewportStatus();
    const device: Device = this.getDevice(viewportStatus.width);
    const scrolledDownThatHeaderIsNotVisible: boolean = this.getScrolledDownThatHeaderIsNotVisible(
      viewportStatus.scrollTop,
      device
    );

    this.deviceSubject$.next(device);
    this.isScrolledDownThatHeaderIsNotVisibleSubject$.next(scrolledDownThatHeaderIsNotVisible);
    this.viewportStatusSubject$.next(viewportStatus);
  }
}
