import { Injectable } from '@angular/core';

import { RrShopWindow } from '../models/page.model';

import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  protected rrShopWindow: RrShopWindow = this.pageService.getRrShopWindow();

  public constructor(protected pageService: PageService) {}

  public pushPagePath(pagePath: string): void {
    this.push('config', this.getGaMeasurementId(), { page_path: pagePath });
  }

  // ----

  protected getGaMeasurementId(): string {
    return this.rrShopWindow.RR_SHOP_GA_MEASUREMENT_ID;
  }

  protected push(...args: any): void {
    if (typeof this.rrShopWindow.gtag === 'function') {
      this.rrShopWindow.gtag(...args);
    }
  }
}
