import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Device, ViewportStatus } from '../models/viewport.model';

const ranges = {
  desktopLarge: 1200,
  desktopMedium: 992,
  tablet: 768
};

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

  protected update(): void {
    const viewportStatus: ViewportStatus = this.getViewportStatus();
    let device: Device;

    if (viewportStatus.width >= ranges.desktopLarge) {
      device = Device.DesktopLarge;
    } else if (viewportStatus.width >= ranges.desktopMedium) {
      device = Device.DesktopMedium;
    } else if (viewportStatus.width >= ranges.tablet) {
      device = Device.Tablet;
    } else {
      device = Device.Mobile;
    }

    this.device$.next(device);
    this.scrolledDownThatHeaderIsNotVisible$.next(viewportStatus.scrollTop > 170);
    this.viewportStatus$.next(viewportStatus);
  }
}
