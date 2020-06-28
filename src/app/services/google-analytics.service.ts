import { Injectable } from '@angular/core';

import { RrShopWindow } from '../models/root.model';

import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  protected readonly rrShopWindow: RrShopWindow = this.rootService.rrShopWindow;

  public constructor(protected rootService: RootService) {}

  public pushPagePath(pagePath: string): void {
    this.push('config', this.getGaMeasurementId(), { page_path: pagePath });
  }

  // ----

  protected getGaMeasurementId(): string {
    return this.rootService.isPlatformBrowser && typeof this.rrShopWindow.RR_SHOP_GA_MEASUREMENT_ID === 'string'
      ? this.rrShopWindow.RR_SHOP_GA_MEASUREMENT_ID
      : '';
  }

  protected push(...args: any): void {
    if (this.rootService.isPlatformBrowser && typeof this.rrShopWindow.gtag === 'function') {
      this.rrShopWindow.gtag(...args);
    }
  }
}
